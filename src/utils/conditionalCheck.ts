// export const isEmpty = (object:any) => Object.values(object).every(x => x === null || x === '');
export const isEmpty = (item:any[]) => item.length === 0
