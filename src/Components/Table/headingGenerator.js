function headingGenerator(data){
    const tempHeadings = [];
    const keys = Object.keys(data[0]);
    keys.forEach((key) => {
      let splited = key.split(/(?=[A-Z])/);
      splited[0] = splited[0][0].charAt(0).toUpperCase() + splited[0].slice(1);
      tempHeadings.push(splited.join(' '))
    })
    return tempHeadings;
}

export default headingGenerator