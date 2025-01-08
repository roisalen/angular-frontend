declare global {
  interface String {
    csvToArray(options?: { fSep?: string; rSep?: string; quot?: string; head?: boolean; trim?: boolean }): [string, string?, string?, string?][];
  }
}

String.prototype.csvToArray = function(o) {
  const od = {
    'fSep': ',',
    'rSep': '\n',
    'quot': '"',
    'head': false,
    'trim': false,
    ...o
  };

  const a: string[][] = [['']];
  for (let r = 0, f = 0, p = 0, q = 0; p < this.length; p++) {
    const c = this.charAt(p);
    switch (c) {
      case od.quot:
        if (q && this.charAt(p + 1) == od.quot) {
          a[r][f] += od.quot;
          ++p;
        } else {
          q ^= 1;
        }
        break;
      case od.fSep:
        if (!q) {
          if (od.trim) {
            a[r][f] = a[r][f].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          }
          a[r][++f] = '';
        } else {
          a[r][f] += c;
        }
        break;
      case od.rSep.charAt(0):
        if (!q && (!od.rSep.charAt(1) || (od.rSep.charAt(1) && od.rSep.charAt(1) == this.charAt(p + 1)))) {
          if (od.trim) {
            a[r][f] = a[r][f].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          }
          a[++r] = [''];
          a[r][f = 0] = '';
          if (od.rSep.charAt(1)) {
            ++p;
          }
        } else {
          a[r][f] += c;
        }
        break;
      default:
        a[r][f] += c;
    }
  }
  if (od.head) {
    a.shift();
  }
  if (a[a.length - 1].length < a[0].length) {
    a.pop();
  }

  // Transform the array before returning
  return a.map(row => [
    row[0] || '',
    row[1],
    row[2],
    row[3]
  ] as [string, string?, string?, string?]);
};

export {}; 