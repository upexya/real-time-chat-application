export default function getTimeDifferenceInMin(t1: string, t2: string) {
  const timestamp_1: any = new Date(t1);
  const timestamp_2: any = new Date(t2);

  if (isNaN(timestamp_1.getTime()) || isNaN(timestamp_2.getTime())) {
    return 0;
  }

  const diff_in_ms = Math.abs(timestamp_1 - timestamp_2); // Get absolute difference
  const diff_in_minutes = diff_in_ms / (60 * 1000); // Convert to minutes

  return diff_in_minutes;
}
