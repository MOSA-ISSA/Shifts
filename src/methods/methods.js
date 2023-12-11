//"2023-11-20","2023-11-30"
export const filterDataByDate = (data, dateFrom, dateTo) => {
    // Parse date strings to Date objects
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    // console.log(toDate.toLocaleDateString());
  
    // Filter the data array based on date range
    const filteredData = data.filter((item) => {
        // console.log(item.date);
      const currentDate = new Date(item.date);
      return currentDate >= fromDate && currentDate <= toDate;
    });
    // console.log(filteredData);
  
    return filteredData;
  };

export const formatDate=(dateString)=> {
    // Split the date components
    const [month, day, year] = dateString.split('/');

    // Rearrange and format the date
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return formattedDate;
}
