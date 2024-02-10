import styles from './stats.module.css';
import { DegreeCentrality } from './degree-centrality';
import { BetweennessCentrality } from './betweenness-centrality';
import { Pagerank } from './pagerank';
import { EigenvectorCentrality } from './eigenvector-centrality';

export const Stats = () => (
  <div className={styles.stats}>
    <Pagerank />
    <DegreeCentrality />
    <BetweennessCentrality />

    <EigenvectorCentrality />
  </div>
);
