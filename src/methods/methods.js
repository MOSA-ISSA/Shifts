
export const filterDataByDate=(data,dateFrom,dateTo)=>{//"2023-11-20","2023-11-30"
    
    const start = new Date(formatDate(dateFrom));
    const end = new Date(formatDate(dateTo));
    console.log(start.toLocaleDateString());
    console.log(end.toLocaleDateString());

    // Filter the data based on the date range
    const filteredData = data.filter((item) => {
        console.log("this data",formatDate(item.date));
        const fixDate = formatDate(item.date);
        const itemDate = new Date(fixDate);
        return itemDate >= start && itemDate <= end;
    });
    console.log("//////////////////////////////////////////",filteredData);

    return filteredData;
}

export const formatDate=(dateString)=> {
    // Split the date components
    const [month, day, year] = dateString.split('/');

    // Rearrange and format the date
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return formattedDate;
}