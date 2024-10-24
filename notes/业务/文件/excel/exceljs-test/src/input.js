const { Workbook } = require('exceljs');

// 解析文件
async function main() {
  const workbook = new Workbook();

  // 数据导入
  const workbook2 = await workbook.xlsx.readFile('./data.xlsx');

  // 遍历工作表拿到每一行的单元格内容
  // 解析方法 ①
  // workbook2.eachSheet((sheet, index1) => {
  //   console.log('工作表' + index1);
  //   sheet.eachRow((row, index2) => {
  //     const rowData = [];
  //     row.eachCell((cell, index3) => {
  //       rowData.push(cell.value);
  //     });
  //     console.log('行' + index2, rowData);
  //   });
  // });

  // exceljs 还提供了简便的方法，可以直接调用 worksheet 的 getSheetValues 来拿到表格数据，不用自己遍历
  // 解析方法 ②
  workbook2.eachSheet((sheet, index1) => {
    console.log('工作表' + index1);

    const value = sheet.getSheetValues();

    console.log(value);
  });
}

main();
