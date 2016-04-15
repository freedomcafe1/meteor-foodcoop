order = new SimpleSchema
  dateCreated:
    type: Date
    defaultValue: new Date()
  orderTotal: type: Number, decimal: true
  cardAmount: type: Number, decimal: true, defaultValue: 0
  balanceAmount: type: Number, decimal: true, defaultValue: 0
  cashAmount: type: Number, decimal: true, optional: true
  
  status:
    type: String
    allowedValues: ['unpaid', 'paid', 'cancelled', 'refunded']
  cashDeposited: type: Boolean, optional: true
  user:
    type: String
    regEx: SimpleSchema.RegEx.Id
  transactionId:
    type: String
    optional:true

Orders.attachSchema order
