TO DO

ADD IN ABILITY TO ADD OPTIONS TO THE PRODUCTS
NEED
OPTION
PRICE
TOTAL SALE

BRAND
SKU
OPTIONS

SIMPLISITIC VIEW FOR PICKING AND SENDING
CHECK BOX, ADD TO RECIEVED, ONLY SHOW NON-RECEIVED ON VIEW

ONLY FOR RECEIVING ITEM, NOTHING TO DO WITH ORDERING

OVERHAUL GET ITEMS
RECEIVE REQUIREMENTS FROM PAGES
MASTER HAS NONE
SHIPPING NEEDS TO BE READY AND UP (SENT TO, SHIPPING, SHIPPED, DELIVERED, ETC...)
RECEIVE FILTERS FROM FILTERS
START DATE
END DATE
SEARCH QUERY
NEED TO STORE ALL OF THESE IN JSON
CACHE THE RESULT IN THE CACHE OF THE SERVER AS A STRINGIFIED JSON OBJECT
PULL FROM CACHE IF AVAILABLE, ELSE PULL FROM SERVER AND THEN CACHE

USER -> PAGES -> FILTERS -> SERVER -> ITEMS -> ALERTS

change order status render on front end to better display statuses, need to overhaul the table generator

troubleshoot new claims issue

change page layout so that table can change size based on screen realestate available

Redo Payment modal to have list view and be separate from add modal

change ordersheet so that if this is a new order, it will only show required fields for placing a new order in red,
edit will show all empty fields red
!this.props.order?

show required fields in notes modal

show alerts on fails on all modals

sent to fills in if all skus status are sent to vendor, if some list as false

LOGIN MODAL ON ANY PAGE THIS.PROPS.AUTH.ISAUTHENTICATED?LOGINMODAL:NULL

change payment view modal to show key label rather than key

change payment modal to render all payable fields rather than the two specified
add to payments tab

Set order sheet to automatically apply status values once certain criteria is met

create user roles, filter buttons based on user roles

add minimize option to table columns

add minimize option to alerts tab to make table take up more of the screen

wrap filters in card with minimize option

implement financial reports

TO CREATE

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
CLAIM/PROBLEM MODEL/COLLECTION
USER
CUSTOMER
ORDER ID
ORDER NUMBER
STATUS
PROBLEM
REPLACEMENT SKUS
REPLACEMENT SHIPMENTS
CONTACTED
LAST CONTACT
LAST UPDATE
NOTES

ORDERED SKU COLLECTION
GET SKUS ON TOGGLE MODAL
ORDER ID
ORDER NUMBER
SKU
QUANTITY
DEALER/VENDOR
MANUFACTURER

DELETE ALL RELATED ITEMS ON DELETE OF AN ORDER
DELETE MODAL (ARE YOU SURE)
MAYBE STORE ALL RELATED ITEMS IN AN ARRAY ON THE ORDER
PAYMENTS=[PAYMENT_ID,PAYMENT_ID,...]
NOTES
PAYMENTS
ORDERED SKUS
CHANGES? (MAYBE KEEP AND ADD A RESTORE FUNCTION)

LOADING BACKDROP, WITH SPINNER

REACT TRANSITIONS

PRODUCT COLLECTION
CHANGE GET BEHAVIOR TO MAKE GET REQUESTS ON CHANGE, STORE RESULTS IN CACHE
SKU BUTTONS NEED TO SHOW BRAND AND COST (MAYBE)

USERS
USER ROLES
MULTI SELECT, CHANGE MODALS TO AUTH.USER.ROLES.FIND(ROLE=>ROLE===INTENDED ROLE)
APPLY TO MODALS, NAV, ETC
STORE ROLES AS AN ARRAY ON THE USER MODEL
CAN'T SEE EDIT WITHOUT EDIT
CAN'T SEE PAYMENT WITHOUT ACCOUNTING
CAN'T SEE DELETE WITHOUT DELETE

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

MINIMIZE/MAXIMIZE COLUMNS
GRAB ALL COLUMNS BY IDENTIFIER
CHANGE WIDTH TO 1EM
CHANGE BUTTON TO SHOW

RESEARCH

Dynamic pages for react to use for reports, printing order forms, claims forms, etc

Adding Slack onto welcome screen, as well as pushing alerts to slack
