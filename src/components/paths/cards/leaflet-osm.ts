import L from 'leaflet';

export const OSM = {};

OSM.TileLayer = L.TileLayer.extend({
  options: {
    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a target="_parent" href="http://www.openstreetmap.org">OpenStreetMap</a> and contributors, under an <a target="_parent" href="http://www.openstreetmap.org/copyright">open license</a>',
  },

  initialize(options) {
    options = L.Util.setOptions(this, options);
    L.TileLayer.prototype.initialize.call(this, options.url);
  },
});

OSM.Mapnik = OSM.TileLayer.extend({
  options: {
    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
});

OSM.CycleMap = OSM.TileLayer.extend({
  options: {
    url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
  },
});

OSM.TransportMap = OSM.TileLayer.extend({
  options: {
    url: 'http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png',
  },
});

OSM.MapQuestOpen = OSM.TileLayer.extend({
  options: {
    url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
    subdomains: '1234',
    attribution: "Tiles courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>",
  },
});

OSM.DataLayer = L.FeatureGroup.extend({
  options: {
    areaTags: [ 'area', 'building', 'leisure', 'tourism', 'ruins', 'historic', 'landuse', 'military', 'natural', 'sport' ],
    uninterestingTags: [ 'source', 'source_ref', 'source:ref', 'history', 'attribution', 'created_by', 'tiger:county', 'tiger:tlid', 'tiger:upload_uuid' ],
    styles: {},
  },

  initialize(xml, options) {
    L.Util.setOptions(this, options);

    L.FeatureGroup.prototype.initialize.call(this);

    if (xml) {
      this.addData(xml);
    }
  },

  addData(features) {
    if (!(features instanceof Array)) {
      features = this.buildFeatures(features);
    }

    for (let i = 0; i < features.length; i++) {
      const feature = features[i]; var
        layer;

      if (feature.type === 'node') {
        layer = L.circleMarker(feature.latLng, this.options.styles.node);
      } else {
        const latLngs = new Array(feature.nodes.length);

        for (let j = 0; j < feature.nodes.length; j++) {
          latLngs[j] = feature.nodes[j].latLng;
        }

        if (this.isWayArea(feature)) {
          latLngs.pop(); // Remove last == first.
          layer = L.polygon(latLngs, this.options.styles.area);
        } else {
          layer = L.polyline(latLngs, this.options.styles.way);
        }
      }

      layer.addTo(this);
      layer.feature = feature;
    }
  },

  buildFeatures(xml) {
    const features = [];
    const nodes = OSM.getNodes(xml);
    const ways = OSM.getWays(xml, nodes);
    const relations = OSM.getRelations(xml, nodes, ways);

    for (const node_id in nodes) {
      const node = nodes[node_id];
      if (this.interestingNode(node, ways, relations)) {
        features.push(node);
      }
    }

    for (let i = 0; i < ways.length; i++) {
      const way = ways[i];
      features.push(way);
    }

    return features;
  },

  isWayArea(way) {
    if (way.nodes[0] != way.nodes[way.nodes.length - 1]) {
      return false;
    }

    for (const key in way.tags) {
      if (~this.options.areaTags.indexOf(key)) {
        return true;
      }
    }

    return false;
  },

  interestingNode(node, ways, relations) {
    let used = false;

    for (var i = 0; i < ways.length; i++) {
      if (ways[i].nodes.indexOf(node) >= 0) {
        used = true;
        break;
      }
    }

    if (!used) {
      return true;
    }

    for (var i = 0; i < relations.length; i++) {
      if (relations[i].members.indexOf(node) >= 0) return true;
    }

    for (const key in node.tags) {
      if (this.options.uninterestingTags.indexOf(key) < 0) {
        return true;
      }
    }

    return false;
  },
});

L.Util.extend(OSM, {
  getNodes(xml) {
    const result = {};

    const nodes = xml.getElementsByTagName('node');
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]; const
        id = node.getAttribute('id');
      result[id] = {
        id,
        type: 'node',
        latLng: L.latLng(
          node.getAttribute('lat'),
          node.getAttribute('lon'),
          true,
        ),
        tags: this.getTags(node),
      };
    }

    return result;
  },

  getWays(xml, nodes) {
    const result = [];

    const ways = xml.getElementsByTagName('way');
    for (let i = 0; i < ways.length; i++) {
      const way = ways[i]; const
        nds = way.getElementsByTagName('nd');

      const way_object = {
        id: way.getAttribute('id'),
        type: 'way',
        nodes: new Array(nds.length),
        tags: this.getTags(way),
      };

      for (let j = 0; j < nds.length; j++) {
        way_object.nodes[j] = nodes[nds[j].getAttribute('ref')];
      }

      result.push(way_object);
    }

    return result;
  },

  getRelations(xml, nodes, ways) {
    const result = [];

    const rels = xml.getElementsByTagName('relation');
    for (let i = 0; i < rels.length; i++) {
      const rel = rels[i]; const
        members = rel.getElementsByTagName('member');

      const rel_object = {
        id: rel.getAttribute('id'),
        type: 'relation',
        members: new Array(members.length),
        tags: this.getTags(rel),
      };

      for (let j = 0; j < members.length; j++) {
        if (members[j].getAttribute('type') === 'node') rel_object.members[j] = nodes[members[j].getAttribute('ref')];
        else // relation-way and relation-relation membership not implemented
        { rel_object.members[j] = null; }
      }

      result.push(rel_object);
    }

    return result;
  },

  getTags(xml) {
    const result = {};

    const tags = xml.getElementsByTagName('tag');
    for (let j = 0; j < tags.length; j++) {
      result[tags[j].getAttribute('k')] = tags[j].getAttribute('v');
    }

    return result;
  },
});
