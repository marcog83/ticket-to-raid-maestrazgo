export function getColorByWeight(weight:number) {
  switch (weight) {
    case 1: return '#44AA99'; // Turquoise - Easiest to pass
    case 2: return '#88CCEE';
    case 3: return '#117733';
    case 4: return '#999933';
    case 5: return '#DDCC77';
    case 6: return '#CC6677';
    case 7: return '#882255'; // Dark red - Hardest to pass
    default: return '#AA4499'; // Default color for weights outside 1-7 range
  }
}
