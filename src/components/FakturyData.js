const staticData = [
  {
    invoiceId: 1,
    invoiceNumber: 1,
    nip: '3698995597',
    paymentStatus: true,
    paymentDate: '2020-09-20',
    invoiceGrossPrice: 1000,
  },
  {
    invoiceId: 2,
    invoiceNumber: 2,
    nip: '3698995597',
    paymentStatus: false,
    paymentDate: '2020-09-20',
    invoiceGrossPrice: 2000,
  },
  {
    invoiceId: 3,
    invoiceNumber: 3,
    nip: '3698995597',
    paymentStatus: true,
    paymentDate: '2020-09-20',
    invoiceGrossPrice: 5000,
  },
  {
    invoiceId: 4,
    invoiceNumber: 5,
    nip: '9244915135',
    paymentStatus: true,
    paymentDate: '2020-09-20',
    invoiceGrossPrice: 200,
  },
  {
    invoiceId: 5,
    invoiceNumber: 6,
    nip: '9244915135',
    paymentStatus: false,
    paymentDate: '2020-09-20',
    invoiceGrossPrice: 400,
  },
  {
    invoiceId: 6,
    invoiceNumber: 7,
    nip: '9244915135',
    paymentStatus: true,
    paymentDate: '2020-09-20',
    invoiceGrossPrice: 900,
  },
];

// https://invoicingmodulepipdproject.azurewebsites.net/api/Invoices/NIP/3698995597?date_do=2020-09-20&date_od=2010-09-12

export { staticData };
