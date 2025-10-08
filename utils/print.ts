import { PrintFieldsType } from '@/types/components';

export function printContent(
  elements: PrintFieldsType[],
  additionalInfo: string
) {
  const title = `<h3 id="title">${additionalInfo}</h3>`;
  let divToPrint = document.getElementById('logbook-table');
  let htmlToPrint = `
    <style type="text/css">
      @page {
        /* Define the size of the page for printing */
        /* size: A4; */
        /* Define margins for the page */
        margin: 1cm;
        margin-bottom: 2cm; /* Adjust as needed to make space for the footer */
        /* Add content to the bottom-right of each page */
        
        @bottom-right {
          content: "Page " counter(page) " of " counter(pages);
          font-family: Arial;
          font-size: 10px;
          border-top: 1px solid #ccc;
          padding-top: 5px;
        }
      }
      #header,
      #button-wrapper,
      #pagination-wrapper,
      #search-params-wrapper,
      #logbook-table th:nth-child(1),
      #logbook-table .td-action:nth-child(1),
      #row-total td:nth-child(1),
      #row-subtotal td:nth-child(1),
      .td_action {
        display: none !important;
      }
      body {
        overflow-x: hidden;
        font-family: Arial;
      }
      #table-wrapper {
        overflow-x: hidden;
      }
      table {
        border: 1px inset #333;
        border-collapse: collapse;
      }
      table th, table td {
        border: 1px inset #333;
        color: #333;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 9px;
        text-align: center;
      }
      table td {
        padding: 5px 0;
      }
      .td_date {
        min-width: 65px !important;
      }
      #row-total td, #row-subtotal td {
        font-weight: bold;
      }
      .td_pic_time,
      .td_dual_time,
      .td_total_flight_time,
      .td_single_engine_time,
      .td_multi_engine_time, {
        min-width: 40px !important;
      }
      .td_aircraft_model {
        min-width: 50px !important;
      } 
      .td_remarks {
        min-width: 80px !important;
      }
      .td_route {
        min-width: 100px !important;
      }
      #title {
        text-align: center;
        font-size: 12px;
        content: #333;
      }
    </style>
  `;

  let additionalStyles = `<style>`;

  elements.forEach((element) => {
    if (!element.checked) {
      const { key } = element;
      additionalStyles += `.td_${key}, .th_${key}, .subtotal_${key}, .total_${key} { display: none !important; } `;
    }
  });

  additionalStyles += `</style> `;

  htmlToPrint += additionalStyles;
  htmlToPrint += title;
  htmlToPrint += divToPrint !== null && divToPrint.outerHTML;

  const newWin = window.open('');

  if (newWin !== null) {
    newWin.document.body.innerHTML = htmlToPrint;
    newWin.print();
    newWin.close();
  }
}
