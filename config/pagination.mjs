export const pagination = (data, page_no, skip) => {
  const pageNo = page_no; //page number

  const ski = skip; //skip the data

  const start = (pageNo - 1) * ski; //start

  const filtered = data.filter((_, index) => {
    return index >= start && index < page_no * skip;
  });

  return filtered;
};
