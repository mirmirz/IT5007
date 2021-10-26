const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

class HotelCalifornia extends React.Component {
  constructor() {
    super();
    this.state = { custDB: [], 
                   showHomePg: true,
                   showAddCustPg: false, 
                   showRemoveCustPg: false, 
                   showTable: false, 
                   showFreeSlot: true,
                   showHomePgBu: false };
    this.createCust = this.createCust.bind(this);
    this.removeCust = this.removeCust.bind(this);
    this.addCustomerBu = this.addCustomerBu.bind(this);
    this.removeCustomerPageBu = this.removeCustomerPageBu.bind(this);
    this.displayTableBu = this.displayTableBu.bind(this);
    this.returnToHomeBu = this.returnToHomeBu.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      customerList {
        id name number timestamp
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ custDB: data.customerList })
    }
  }

  async createCust(cust) {
    const query = `mutation customerAdd($cust: CustomerInputs!) {
      customerAdd(customer: $cust) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { cust });
    if(data) {
      this.loadData();
    }
  }

  async removeCust(custSn) {
    const query = `mutation customerRemove($custSn: ID!) {
      customerRemove(id: $custSn)
    }`;

    const data = await graphQLFetch(query, { custSn });
    if(data) {
      this.loadData();
    } 
  }

  addCustomerBu() {
    this.setState({ showHomePg : false });
    this.setState({ showAddCustPg : true });
    this.setState({ showFreeSlot : false });
    this.setState({ showHomePgBu : true });
  }

  removeCustomerPageBu() {
    this.setState({ showHomePg : false });
    this.setState({ showRemoveCustPg : true });
    this.setState({ showTable : true });
    this.setState({ showFreeSlot : false });
    this.setState({ showHomePgBu : true });
  }

  displayTableBu() {
    this.setState({ showHomePg : false });
    this.setState({ showTable : true });
    this.setState({ showFreeSlot : false });
    this.setState({ showHomePgBu : true });
  }

  returnToHomeBu() {
    this.setState({ showHomePg : true });
    this.setState({ showAddCustPg : false });
    this.setState({ showRemoveCustPg : false });
    this.setState({ showTable : false });
    this.setState({ showFreeSlot : true });
    this.setState({ showHomePgBu : false });
  }

  render() {
    return (
      <>
        <h1>Welcome to Hotel California!</h1>
        <br />
        { this.state.showHomePg ? <Homepage addCustomerBu={this.addCustomerBu}
                                            removeCustomerPageBu={this.removeCustomerPageBu} 
                                            displayTableBu={this.displayTableBu}/> : null }
        { this.state.showAddCustPg ? <AddCustomerPage createCust={this.createCust} /> : null }
        { this.state.showRemoveCustPg ? <RemoveCustomerPage removeCust={this.removeCust}/> : null }
        { this.state.showTable ? <WaitingListTable custDB={this.state.custDB}/> : null }
        { this.state.showFreeSlot ? <DisplayFreeSlots custDB={this.state.custDB}/> : null }
        <br />
        <br />
        { this.state.showHomePgBu ? <HomepageBu returnToHomeBu={this.returnToHomeBu}/> : null }
      </>
    )
  }
}

class Homepage extends React.Component {
  render() {
    return (
      <div className="mainPage">
        <button className="AddCustBu" onClick={this.props.addCustomerBu}>Add Customer</button>
        <button className="RemoveCustBu" onClick={this.props.removeCustomerPageBu}>Remove Customer</button>
        <button className="DisplayTableBu" onClick={this.props.displayTableBu}>Display Waiting List</button>
      </div>
    )
  }
}

class AddCustomerPage extends React.Component {
  constructor() {
    super();
    this.handleAddCust = this.handleAddCust.bind(this);
  }

  handleAddCust = (e) =>{
    e.preventDefault();
    const form = document.forms.addCust;
    const cust = {name: form.name.value, number: form.number.value}
    this.props.createCust(cust)
    form.name.value = "";
    form.number.value = "";
  };
  render() {
    return (
      <form style={this.props.style} name="addCust" onSubmit={this.handleAddCust}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Enter name here.."
            required
          />
        </label>
        <label>
          Phone No.:
          <input
            type="text"
            name="number"
            maxLength="8"
            placeholder="e.g. 94123674"
            required />
        </label>
        <br />
        <button>Submit</button>
      </form>
    );
  }
}

class RemoveCustomerPage extends React.Component {
  constructor() {
    super();
    this.handleRemoveCust = this.handleRemoveCust.bind(this);
  }

  handleRemoveCust = (e) =>{
    e.preventDefault();
    const form = document.forms.removeCust;
    const custSn = {id: parseInt(form.SnRemoval.value) }
    this.props.removeCust(custSn)
    form.SnRemoval.value = "";
  };

  render() {
    return (
      <form name="removeCust" onSubmit={this.handleRemoveCust}>
        <label>
          Enter Sn for removal:
          <input 
            type="text" 
            name="SnRemoval" 
            placeholder="Insert ID here" 
            required />
        </label>
        <button>Remove Customer</button>
        <br />
      </form>
    );
  }
}

function WaitingListTable(props) {
  const custRows = props.custDB.map(cust => <CustRow key={cust.ID} cust={cust}/>);
  return (
    <table className="WaitingListTable" style={{borderCollapse: "collapse"}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Number</th>
          <th>TimeStamp</th>
        </tr>
      </thead>
      <tbody>
        {custRows}
      </tbody>
    </table>
  );
}

function CustRow(props) {
  const cust = props.cust;
  return (
    <tr>
      <td>{cust.id}</td>
      <td>{cust.name}</td>
      <td>{cust.number}</td>
      <td>{cust.timestamp.toDateString()}</td>
    </tr>
  );
}

class DisplayFreeSlots extends React.Component {
  render() {
    return (
      <div className="dispFreeSlots">
        <br />
        <h2>No. of free available waiting slots:</h2>
        <br />
        <h3 id="FreeSlotsTotal">{25 - this.props.custDB.length}</h3>
      </div>
    )
  }
}

class HomepageBu extends React.Component {
  render() {
    return (
      <button onClick={this.props.returnToHomeBu}>Return to HomePage</button>
    )
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

ReactDOM.render( <HotelCalifornia />, document.getElementById('HotelCalifornia'));