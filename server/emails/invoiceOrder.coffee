# Meteor.methods
#   invoiceOrder: ->
#     user = Meteor.users.findOne(@userId)
#     invoiceNumber = Random.id(6)
#     if Roles.userIsInRole 'wholesaleBuyer'
#       invoice =
#         recipient: user.profile.name
#         number: invoiceNumber
#         date: moment().format('dddd, MMMM Do YYYY')
#         items: user.profile.cart.products
#
#       # add latency compensation
#       if @isSimulation
#         #remove items from cart
#         console.log "running on the client!"
#
#       result = Mailer.send
#         to: "#{user.profile.name} <#{user.emails[0].address}>"
#         subject: "Fresh Food Collective Invoice"
#         template: "wholesaleInvoiceEmail"
#         data: invoice
#
#       if result
#         # TODO: create inactive subscriptions from cart?
#         console.log "successfully sent invoice"
#     else
#       "You don't have permission to get emailed invoices"
