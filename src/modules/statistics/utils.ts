export function createPythonDate(dateString: string): string {
  const date = parseInt(dateString.slice(-2));
  const year = dateString.slice(0, 4);
  const month = parseInt(dateString.slice(5, -3)) - 1;
  return lpad(`${date}`, "0", 2) + "-" + lpad(`${month}`, "0", 2) + "-" + year;
}

export function lpad(str: string, padString: string, length: number): string {
  while (str.length < length) {
    str = padString + str;
  }
  return str;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function extractValues(data: any[]) {
  const entries: number[] = [];
  const ids: string[] = [];
  const replies: number[] = [];
  const idAndEntries: [string, number][] = [];
  const idAndReplies: [string, number][] = [];

  data.forEach(valueJson => {
    if (valueJson._id) {
      ids.push(valueJson._id);
      entries.push(valueJson.mainEntries);
      replies.push(valueJson.replies);
      idAndEntries.push([valueJson._id, valueJson.mainEntries]);
      idAndReplies.push([valueJson._id, valueJson.replies]);
    }
  });

  return { ids, replies, entries, idAndReplies, idAndEntries };
} 