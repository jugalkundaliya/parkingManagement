export const filterInit = {
  pageNo: 1,
  pageSize: 3,
  sortColumn: "allottingTime",
  sortOrder: "desc",
  max: 1000,
  min: 0,
  startDate: null,
  endDate: null,
};
export const removeNullParameters = (filter) => {
  const filterToApply = { ...filter };
  (filterToApply.endDate === null || filterToApply.endDate === "") &&
    delete filterToApply.endDate;
  (filterToApply.startDate === null || filterToApply.startDate === "") &&
    delete filterToApply.startDate;
  filterToApply.max === 1000 && delete filterToApply.max;
  return filterToApply;
};
