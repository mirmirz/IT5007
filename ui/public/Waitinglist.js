"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

var HotelCalifornia = /*#__PURE__*/function (_React$Component) {
  _inherits(HotelCalifornia, _React$Component);

  var _super = _createSuper(HotelCalifornia);

  function HotelCalifornia() {
    var _this;

    _classCallCheck(this, HotelCalifornia);

    _this = _super.call(this);
    _this.state = {
      custDB: [],
      showHomePg: true,
      showAddCustPg: false,
      showRemoveCustPg: false,
      showTable: false,
      showFreeSlot: true,
      showHomePgBu: false
    };
    _this.createCust = _this.createCust.bind(_assertThisInitialized(_this));
    _this.removeCust = _this.removeCust.bind(_assertThisInitialized(_this));
    _this.addCustomerBu = _this.addCustomerBu.bind(_assertThisInitialized(_this));
    _this.removeCustomerPageBu = _this.removeCustomerPageBu.bind(_assertThisInitialized(_this));
    _this.displayTableBu = _this.displayTableBu.bind(_assertThisInitialized(_this));
    _this.returnToHomeBu = _this.returnToHomeBu.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(HotelCalifornia, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n      customerList {\n        id name number timestamp\n      }\n    }";
                _context.next = 3;
                return graphQLFetch(query);

              case 3:
                data = _context.sent;

                if (data) {
                  this.setState({
                    custDB: data.customerList
                  });
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createCust",
    value: function () {
      var _createCust = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cust) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation customerAdd($cust: CustomerInputs!) {\n      customerAdd(customer: $cust) {\n        id\n      }\n    }";
                _context2.next = 3;
                return graphQLFetch(query, {
                  cust: cust
                });

              case 3:
                data = _context2.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createCust(_x) {
        return _createCust.apply(this, arguments);
      }

      return createCust;
    }()
  }, {
    key: "removeCust",
    value: function () {
      var _removeCust = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(custSn) {
        var query, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "mutation customerRemove($custSn: Int!) {\n      customerRemove(custSn: $custSn)\n    }";
                _context3.next = 3;
                return graphQLFetch(query, {
                  custSn: custSn
                });

              case 3:
                data = _context3.sent;

                if (data) {
                  this.loadData();
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function removeCust(_x2) {
        return _removeCust.apply(this, arguments);
      }

      return removeCust;
    }()
  }, {
    key: "addCustomerBu",
    value: function addCustomerBu() {
      this.setState({
        showHomePg: false
      });
      this.setState({
        showAddCustPg: true
      });
      this.setState({
        showFreeSlot: false
      });
      this.setState({
        showHomePgBu: true
      });
    }
  }, {
    key: "removeCustomerPageBu",
    value: function removeCustomerPageBu() {
      this.setState({
        showHomePg: false
      });
      this.setState({
        showRemoveCustPg: true
      });
      this.setState({
        showTable: true
      });
      this.setState({
        showFreeSlot: false
      });
      this.setState({
        showHomePgBu: true
      });
    }
  }, {
    key: "displayTableBu",
    value: function displayTableBu() {
      this.setState({
        showHomePg: false
      });
      this.setState({
        showTable: true
      });
      this.setState({
        showFreeSlot: false
      });
      this.setState({
        showHomePgBu: true
      });
    }
  }, {
    key: "returnToHomeBu",
    value: function returnToHomeBu() {
      this.setState({
        showHomePg: true
      });
      this.setState({
        showAddCustPg: false
      });
      this.setState({
        showRemoveCustPg: false
      });
      this.setState({
        showTable: false
      });
      this.setState({
        showFreeSlot: true
      });
      this.setState({
        showHomePgBu: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Welcome to Hotel California!"), /*#__PURE__*/React.createElement("br", null), this.state.showHomePg ? /*#__PURE__*/React.createElement(Homepage, {
        addCustomerBu: this.addCustomerBu,
        removeCustomerPageBu: this.removeCustomerPageBu,
        displayTableBu: this.displayTableBu
      }) : null, this.state.showAddCustPg ? /*#__PURE__*/React.createElement(AddCustomerPage, {
        createCust: this.createCust
      }) : null, this.state.showRemoveCustPg ? /*#__PURE__*/React.createElement(RemoveCustomerPage, {
        removeCust: this.removeCust
      }) : null, this.state.showTable ? /*#__PURE__*/React.createElement(WaitingListTable, {
        custDB: this.state.custDB
      }) : null, this.state.showFreeSlot ? /*#__PURE__*/React.createElement(DisplayFreeSlots, {
        custDB: this.state.custDB
      }) : null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), this.state.showHomePgBu ? /*#__PURE__*/React.createElement(HomepageBu, {
        returnToHomeBu: this.returnToHomeBu
      }) : null);
    }
  }]);

  return HotelCalifornia;
}(React.Component);

var Homepage = /*#__PURE__*/function (_React$Component2) {
  _inherits(Homepage, _React$Component2);

  var _super2 = _createSuper(Homepage);

  function Homepage() {
    _classCallCheck(this, Homepage);

    return _super2.apply(this, arguments);
  }

  _createClass(Homepage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "mainPage"
      }, /*#__PURE__*/React.createElement("button", {
        className: "AddCustBu",
        onClick: this.props.addCustomerBu
      }, "Add Customer"), /*#__PURE__*/React.createElement("button", {
        className: "RemoveCustBu",
        onClick: this.props.removeCustomerPageBu
      }, "Remove Customer"), /*#__PURE__*/React.createElement("button", {
        className: "DisplayTableBu",
        onClick: this.props.displayTableBu
      }, "Display Waiting List"));
    }
  }]);

  return Homepage;
}(React.Component);

var AddCustomerPage = /*#__PURE__*/function (_React$Component3) {
  _inherits(AddCustomerPage, _React$Component3);

  var _super3 = _createSuper(AddCustomerPage);

  function AddCustomerPage() {
    var _this2;

    _classCallCheck(this, AddCustomerPage);

    _this2 = _super3.call(this);

    _defineProperty(_assertThisInitialized(_this2), "handleAddCust", function (e) {
      e.preventDefault();
      var form = document.forms.addCust;
      var cust = {
        name: form.name.value,
        number: form.number.value
      };

      _this2.props.createCust(cust);

      form.name.value = "";
      form.number.value = "";
    });

    _this2.handleAddCust = _this2.handleAddCust.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(AddCustomerPage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        style: this.props.style,
        name: "addCust",
        onSubmit: this.handleAddCust
      }, /*#__PURE__*/React.createElement("label", null, "Name:", /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Enter name here..",
        required: true
      })), /*#__PURE__*/React.createElement("label", null, "Phone No.:", /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "number",
        maxLength: "8",
        placeholder: "e.g. 94123674",
        required: true
      })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", null, "Submit"));
    }
  }]);

  return AddCustomerPage;
}(React.Component);

var RemoveCustomerPage = /*#__PURE__*/function (_React$Component4) {
  _inherits(RemoveCustomerPage, _React$Component4);

  var _super4 = _createSuper(RemoveCustomerPage);

  function RemoveCustomerPage() {
    var _this3;

    _classCallCheck(this, RemoveCustomerPage);

    _this3 = _super4.call(this);

    _defineProperty(_assertThisInitialized(_this3), "handleRemoveCust", function (e) {
      e.preventDefault();
      var form = document.forms.removeCust;

      _this3.props.removeCust(parseInt(form.SnRemoval.value));

      form.SnRemoval.value = "";
    });

    _this3.handleRemoveCust = _this3.handleRemoveCust.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(RemoveCustomerPage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "removeCust",
        onSubmit: this.handleRemoveCust
      }, /*#__PURE__*/React.createElement("label", null, "Enter Sn for removal:", /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "SnRemoval",
        placeholder: "Insert ID here",
        required: true
      })), /*#__PURE__*/React.createElement("button", null, "Remove Customer"), /*#__PURE__*/React.createElement("br", null));
    }
  }]);

  return RemoveCustomerPage;
}(React.Component);

function WaitingListTable(props) {
  var custRows = props.custDB.map(function (cust) {
    return /*#__PURE__*/React.createElement(CustRow, {
      key: cust.ID,
      cust: cust
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "WaitingListTable",
    style: {
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Number"), /*#__PURE__*/React.createElement("th", null, "TimeStamp"))), /*#__PURE__*/React.createElement("tbody", null, custRows));
}

function CustRow(props) {
  var cust = props.cust;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, cust.id), /*#__PURE__*/React.createElement("td", null, cust.name), /*#__PURE__*/React.createElement("td", null, cust.number), /*#__PURE__*/React.createElement("td", null, cust.timestamp.toDateString()));
}

var DisplayFreeSlots = /*#__PURE__*/function (_React$Component5) {
  _inherits(DisplayFreeSlots, _React$Component5);

  var _super5 = _createSuper(DisplayFreeSlots);

  function DisplayFreeSlots() {
    _classCallCheck(this, DisplayFreeSlots);

    return _super5.apply(this, arguments);
  }

  _createClass(DisplayFreeSlots, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        className: "dispFreeSlots"
      }, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h2", null, "No. of free available waiting slots:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("h3", {
        id: "FreeSlotsTotal"
      }, 25 - this.props.custDB.length));
    }
  }]);

  return DisplayFreeSlots;
}(React.Component);

var HomepageBu = /*#__PURE__*/function (_React$Component6) {
  _inherits(HomepageBu, _React$Component6);

  var _super6 = _createSuper(HomepageBu);

  function HomepageBu() {
    _classCallCheck(this, HomepageBu);

    return _super6.apply(this, arguments);
  }

  _createClass(HomepageBu, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("button", {
        onClick: this.props.returnToHomeBu
      }, "Return to HomePage");
    }
  }]);

  return HomepageBu;
}(React.Component);

function graphQLFetch(_x3) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            variables = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            _context4.prev = 1;
            _context4.next = 4;
            return fetch(window.ENV.UI_API_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context4.sent;
            _context4.next = 7;
            return response.text();

          case 7:
            body = _context4.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context4.abrupt("return", result.data);

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            alert("Error in sending data to server: ".concat(_context4.t0.message));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

ReactDOM.render( /*#__PURE__*/React.createElement(HotelCalifornia, null), document.getElementById('HotelCalifornia'));