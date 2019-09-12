##############################################################################################################
NOTICE
##############################################################################################################

## We are deploying this week, need to set up static ip address, as well as raspberri pi to function as server

##############################################################################################################
QUESTIONS
##############################################################################################################

## On the order manager page

## once an order is ready to ship

## awaiting items have been received, and others have been in stock and ready

# how would the quantity react to broken up orders?

like 1 in stock, 1 on order to ka, and 1 on order that will be delivered to the customer
the shipment would only be required to keep track of the orders leaving ka as the order being delivered fro the vendor to the customer would be it's own shipment, to be determined
when the order is ready at the ka level, only the amounts ready should be provided
to obtain that value, it should adjust the remaining quantity
the total quantities should be stored inside of object in the database
therefore there should be a ka-ship talley that is set by the amounts available in ka are determined by what is in stock and what is received, the number shown on the ready card should be the ka-talley, and have no reflection of the items being sent, and should absolutely not be reflected by the skus_quantity value as that value is soley for record purposes,and determines the remaining value, addressing that value directly will misrepresent the total amount being sent in the shipment from KA

# should we allow for breaking up orders to ship separately?

I think so, I doubt that we would wait until an order is completely fulfilled to send out, ideally it will be, as well as being paid completely in full, I will need to research further into this problem to find out if there are ever cases in which we send out an order before it is paid in full, I know we shouldn't but who knows.

# What is the minimum criteria to be met for an order to be ready to ship?

If we do decide to move forward with a shipment before it has been paid for in its entirety/etc, then the order should definitely be flagged as important, and be easy to follow then entirety of the shipment

##############################################################################################################
BUGS
##############################################################################################################

# Ubuntu deployment won't start, node-sass issue

# Here is the solution sudo npm install --unsafe-perm node-sass

order manager can get out of sync and lose all products, but re-appear on refresh

#Fixed--9/11/2019- ORDER CHECKED AND INSTOCK APPENEDED IT TO ANOTHER ORDER \*

#Fixed--9/11/2019- SELECTING CURRENTLY IN STOCK BLANKS THE PAGE RATHER THAN GETTING THE UPDATED INFORMATION \*

#Fixed--9/11/2019- REMOVING ORDERD SKUS STILL DOESN'T HAPPEN IMMEDIATELY/REMOVING ORDERED SKUS REMOVES THINGS OTHER THAN THE ORDERED SKU THAT WE ARE ATTEMPTING TO REMOVE \*

order manager can get oout of sync and lose all products, but re-appear on refresh
disappear on entering and exitting a modal from another page, more than likely from the clear orderedSkus function
-to fix, get ordered skus on page load of orderManager, or, getOrderedSkus through top componenet, and filter the ordered skus when accessed from order specific modals, and never clear

#removing items from order can remove seemingly random item

adding item as ready to ship, adds the item to whatever order is ready to ship at the time

#setting order as ready to ship on order manager page, causes everything to disappear

#CHANGING A USER LOGS YOU INTO THAT USER
#CREATING NEW USER, ON INITIAL TABLE RENDER, DUPLICATES THE LOWEST USERS USER DATA, PROBABLY NOT WAITING TO RECOVER DATA FROM SERVER

#unhandled rejection data of undefined when logging in, caused by navbar attempting to get roles, not returning roles

SHOW ALL / SHOW FILTERED RESULTS CAN GET OUT OF SYNC AND REVERSE ITSELF

alert DBKEYS has not ready to ship, even though status is ready to ship

removing items from order needs refresh after every removed item

#Alerts can repopulate on refresh, probably getting all alerts from somewhere else, attempted to fix this issue, but now they disappear completely on refresh
#if(!alerts||!alerts.length>0) doesn't work, it is possibly still storing the alerts somewhere

#alerts do not generate on page refresh
#pipelined the get requests, on component did mount, it gets the items with filters from the filter reducer, on get completetion, it then calls getAlerts with the results after #the item reducer has put the results in the state, the alerts container just passes back all the alerts from the redux state

#shuffling pages can cause app to crash because of alerts not being able an order that's status works, problem being that alerts is being called at the same time, or too soon, #before getItems has brought the items to the store
#receiving manager->order manager crashes app on getAlerts

#ON LOAD, VALIDATION DOES NOT HAPPEN UNTIL AFTER A FEW CYCLES, BOOKMARKING PAGES ACCOMPLISHES NOTHING
#Navbar and welcome page seem to cause this issue
#changed from isAuthenticated to checking if the token exists in the local storage, doesn't reload every time, can bookmark and just enter urls directly

##############################################################################################################
TO DO CHANGES
##############################################################################################################

Make the changes below, need to find and replace in all explicit code, this will not be fun

addrCheck -> addresses_checked
billToAddress -> bill_to_address
billToChecked -> bill_to_checked
billToState -> bill_to_state
billToZip -> bill_to_zip
caTax -> ca_tax
caTaxPaid -> ca_tax_paid
caTaxPaidDate -> ca_tax_paid_date
creation_date -> creation_date
disclaim -> disclaimer
lastUpdated -> last_updated
netDue -> net
netCrate -> net_crate
netFreight -> net_freight
netPaid -> net_paid
netPaidDate -> net_paid_date
net -> net_profit
nysTax -> nys_tax
nysTaxPaid -> nys_tax_paid
nysTaxPaidDate -> nys_tax_paid_date
custDue -> order
date -> order_date
name -> order_name
orderNum -> order_number
custPaid -> order_paid
custPaidDate -> order_paid_date
orderSkus -> order_skus
orderStatus -> order_status
total -> order_total
ship -> ship_as
shipped -> ship_date
shipToAddress -> ship_to_address
shipToChecked -> ship_to_checked
st -> ship_to_state
shipToZip -> ship_to_zip
rcvd -> skus_received
sentTo -> vendor

##############################################################################################################
TO DO
##############################################################################################################

#Add second modal to create shipment modal
#pass in state as shipment prop, when passing to db {...this.props.shipment,...this.state}
#second modal verifies recipient information, add notes, select lift gate, etc
enter any cod amounts
#then the post request will be made, and toggle both the inner and outter modals
#pass in toggle to modal, on close toggle/success of post on second modal, execute the toggleParent function passed in via props

add capacity to add options onto orderedSku, add notes to ordered sku

add outgoing orders page

where its going to, what are the contents, is there a cod, is there a lift gate, only show orders sent via kitchenall/kas as carrrier
generate routes here, estimated delivery times

change add products/upload products modal to be visible only if you have create and edit options,
change backend security so that all routes are set to private and require the user to be logged in before returning anything

---

## Shipping an Order Process

Add skus to order from master sheet, skus status=pending
->
goto order manager
->
check if item is currently in stock or needs to be sent to the vendor
->
ON SEND TO VENDOR, set status as sent to vendor
->
ON VENDOR FULFILLED DELIVERY, set status to shipped, set tracking number to vendor provided, if not yet shipped by vendor, generate alert that an order has been shipped without a tracking number on the shipping manager page
||
populate on receiving manager, flag if time exceeds expected delivery date
->
ON CURRENTLY IN STOCK, set sku status to ready to be shipped, check if all other shipments matching that orderId are ready to be shipped
->
ON ALL OTHER SKUS READY TO BE SHIPPED, change order status to "ready to be shipped", populate in orders ready to ship
||
remove from skus to be checked, order stays pending until all skus are ready to be shipped
->
ON SHIP, create shipment, select all skus to be added onto shipment, enter tracking number, estimated delivery date, show shipment in shipping manager
->
ON ALL PRODUCTS SHIPPED: set order status to shipped

currently in stock ->
editOrderedSku(
instock_quantity=value
instock_date=Date.now()
remaining_quantity=skus_quantity-value
)

Send to Vendor ->
Modal
Deliver To
-o Customer
-o Kitchenall
createNewShipment(
{...orderedSku,
quantity:value
}
)

---

move add customer orders option to nav bar after dropdown

add create claim option on claims page
search for order to create a claim for

set up users actions to clear actions, and automatically close modal on success

MAYBE STORE ALL RELATED ITEMS IN AN ARRAY ON THE ORDER
PAYMENTS=[PAYMENT_ID,PAYMENT_ID,...]

Add left and right arrows to month name in financial page, add year next to month name if not this year

Add uncontrolled drop down to Status, manufacturer, sent to

ADD IN ABILITY TO ADD OPTIONS TO THE PRODUCTS
NEED
OPTION
PRICE
TOTAL SALE

#BRAND
#SKU
OPTIONS

#SIMPLISITIC VIEW FOR PICKING AND SENDING
#CHECK BOX, ADD TO RECIEVED, ONLY SHOW NON-RECEIVED ON VIEW

#ONLY FOR RECEIVING ITEM, NOTHING TO DO WITH ORDERING

#OVERHAUL GET ITEMS
#RECEIVE REQUIREMENTS FROM PAGES
MASTER HAS NONE
SHIPPING NEEDS TO BE READY AND UP (SENT TO, SHIPPING, SHIPPED, DELIVERED, ETC...)
#RECEIVE FILTERS FROM FILTERS
#START DATE
#END DATE
#SEARCH QUERY
#NEED TO STORE ALL OF THESE IN JSON
#CACHE THE RESULT IN THE CACHE OF THE SERVER AS A STRINGIFIED JSON OBJECT
#PULL FROM CACHE IF AVAILABLE, ELSE PULL FROM SERVER AND THEN CACHE

#USER -> PAGES -> FILTERS -> SERVER -> ITEMS -> ALERTS

#change order status render on front end to better display statuses, need to overhaul the table generator

#troubleshoot new claims issue

#change page layout so that table can change size based on screen realestate available

Redo Payment modal to have list view and be separate from add modal

change ordersheet so that if this is a new order, it will only show required fields for placing a new order in red,
#edit will show all empty fields red
!this.props.order?

#show required fields in notes modal

show alerts on fails on all modals

sent to fills in if all skus status are sent to vendor, if some list as false

LOGIN MODAL ON ANY PAGE THIS.PROPS.AUTH.ISAUTHENTICATED?LOGINMODAL:NULL

change payment view modal to show key label rather than key

change payment modal to render all payable fields rather than the two specified
add to payments tab

Set order sheet to automatically apply status values once certain criteria is met

#create user roles
filter buttons based on user roles

add minimize option to table columns

#add minimize option to alerts tab to make table take up more of the screen

wrap filters in card with minimize option

implement financial reports

##############################################################################################################
TO CREATE
##############################################################################################################

PERSONALIZED WELCOME PAGE WITH FAVORITED PAGES
SAVED REPORTS
SUBSCRIBED REPORTS
CHANGELOG
NOTIFICATIONS
WATCHED ORDERS

GET SERVER RESPONSE ON MODALS TO AUTO CLOSE OR DISPLAY ALERTS

FINANCIAL PAGE
SET PAYMENT TO AUTO FILL BASED ON USER ROLES, AND PAYABLE OPTIONS
FILTER(KEY=>KEY.PAYABLE===TRUE&&USER.AUTH.ROLES.FIND(ROLE=>ROLE==="ACCOUNTING"))
ADD CHECKBOX TO EVERY ORDER FOR MULTIPLE SELECT, PAYMENTS MADE TO THIS WOULD HAVE TO BE IN FULL

CONTAINER TRACKER
ENTER IN CONTAINER ORDERS
CONTAINER ORDER DATE
MANUFACTURER
SKUS (FROM AVAILABLE)
CREATE NEW SKU (ADD SKU TO COLLECTION)
ESTIMATED ARRIVAL DATE
SHIPPING BY
SHIPPING FROM
SHIPPING TO

CLAIMS/PROBLEMS PAGE
#CLAIM/PROBLEM MODEL/COLLECTION
#USER
#CUSTOMER
#ORDER ID
#ORDER NUMBER
#STATUS
#PROBLEM
#REPLACEMENT SKUS
#REPLACEMENT SHIPMENTS
#CONTACTED
#LAST CONTACT
#LAST UPDATE
#NOTES

#ORDERED SKU COLLECTION
#GET SKUS ON TOGGLE MODAL
#ORDER ID
#ORDER NUMBER
#SKU
#QUANTITY
#DEALER/VENDOR
#MANUFACTURER

#DELETE ALL RELATED ITEMS ON DELETE OF AN ORDER
#DELETE MODAL (ARE YOU SURE)
#NOTES
#PAYMENTS
#ORDERED SKUS
#CHANGES? (MAYBE KEEP AND ADD A RESTORE FUNCTION)
MAYBE ARCHIVE RATHER THAN DELETE

LOADING BACKDROP, WITH SPINNER

REACT TRANSITIONS

#PRODUCT COLLECTION
CHANGE GET BEHAVIOR TO MAKE GET REQUESTS ON CHANGE, STORE RESULTS IN CACHE
#SKU BUTTONS NEED TO SHOW BRAND AND COST (MAYBE)

#USERS
#USER ROLES
#MULTI SELECT, CHANGE MODALS TO AUTH.USER.ROLES.FIND(ROLE=>ROLE===INTENDED ROLE)
#APPLY TO MODALS
#NAV
#ETC

#STORE ROLES AS AN ARRAY ON THE USER MODEL
#CAN'T SEE EDIT WITHOUT EDIT
#CAN'T SEE PAYMENT WITHOUT ACCOUNTING
#CAN'T SEE DELETE WITHOUT DELETE

internal notification and message system

GROUP NOTIFICATIONS
NOTIFY TAGGED GROUPS LIKE OFFICE, WAREHOUSE, ETC...
ALERT [OFFICE] TO THIS ORDER BUTTON
ADD NOTE
ON CHANGE ADD NOTIFICATION OF CHANGE
USER HAS MADE CHANGES TO ORDER

Email Notification System

SEND OUT DISCLAIMERS TO CUSTOMER
KEEP LOG OF ALL COMMUNICATIONS TO AND FROM CUSTOMER
TRY TO REPLACE ADOBE SIGN

Google street view on order form
USE STREET VIEW API TO ALLOW USERS TO CHECK ADDRESS IN REAL TIME RIGHT ON THE ORDER PAGE

ORDER TRACKER
live ups, usps, fedex tracking

INVENTORY MANAGER
ERP inventory tracking
1 LISTING PER PRODUCT
LISTING SHOWS LIVE INVENTORY STATUS IN ALL WAREHOUSES
ALSO SHOWS INCOMING ORDERS THAT ARE YET TO BE RECEIVED
DISCOUNT TRACKING

WEB PAGE
website monitoring
Price monitoring (IF PRICES/MAP HAVEN'T BEEN CHANGED IN X AMOUNT OF MONTHS ALERT THAT THE PRICING SHOULD BE CHECKED, MAYBE COMBINE WITH THE EMAIL SYSTEM AND AUTOMATICALLY REACH OUT TO SPECIFIC CARRIERS TO GET PRICE UPDATES ON ITEMS THAT HAVEN'T CHANGED OR AREN'T SELLING MUCH)

sale tracking
TRACK PRICES
SALES
MOST SOLD ITEMS
LEAST SOLD ITEMS
CHART SALES OVER PERIODS OF TIMES
DISCOUNT TRACKING, ALL IN ONE PLACE TO VIEW, EDIT DISCOUNTS FROM CERTAIN PROVIDERS

KEY COLLECTION
MOVE THE DBKEYSLIST FROM KEY REDUCER, I USE IT TOO MUCH TO NOT JUST SET UP A DATABASE AND MANAGER FOR IT

PAGE COLLECTION
PAGE KEYS
PAGE ALERTS
PAGE ACTIONS
PAGE REDUCER
RECORD PAGES VISITTED, NUMBER OF TIMES VISITTED, DISPLAY QUICK ACCESS TO PAGE ON WELCOME SCREEN
MANAGE PAGE NAME SHOWN IN DROPDOWN ON NAVBAR

NAVBAR
ADD BADGES TO EASILY SHOW HOW MANY ALERTS ARE ON EACH PAGE
GET RID OF DROPDOWN ON MOBILE VIEW
LOAD IN FULL ALTERNATE OPTION ON MOBILE VIEW

MINIMIZE/MAXIMIZE COLUMNS
GRAB ALL COLUMNS BY IDENTIFIER
CHANGE WIDTH TO 1EM
CHANGE BUTTON TO SHOW

RESEARCH

Dynamic pages for react to use for reports, printing order forms, claims forms, etc

Adding Slack onto welcome screen, as well as pushing alerts to slack

##############################################################################################################
DESIGN CHANGES
##############################################################################################################

? Create Vertical Navbar similar to wordpress
? Create Minimizable card with tabs inside, filters tab, reports tab, special actions tab
? Move Add Customer Order(s) button to top navbar next to search
? User Welcome Screen with reports based on user role, subscriptions, notifications, changes, alerts
? Modals show errors on !success
