
export const filterDataByDate=(data,dateFrom,dateTo)=>{
    
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    console.log(start.toLocaleDateString());
    console.log(end.toLocaleDateString());

    // Filter the data based on the date range
    const filteredData = data.filter((item) => {
        console.log("this data",formatDate(item.date));
        const fixDate = formatDate(item.date);
        const itemDate = new Date(fixDate);
        return itemDate >= start && itemDate <= end;
    });

    return filteredData;
}

const formatDate=(dateString)=> {
    // Split the date components
    const [month, day, year] = dateString.split('/');

    // Rearrange and format the date
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return formattedDate;
}