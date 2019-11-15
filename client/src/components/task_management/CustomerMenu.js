import React from 'react';
import { Dropdown } from 'semantic-ui-react'

class CustomerMenu extends React.Component {
  render() {
    const { customers, setCustomer } = this.props

    const customerItems = customers.map(function(customer) {
      return (
        <Dropdown.Item
          key={customer.id}
          onClick={(e) => setCustomer(customer.id)}>
          {customer.name}
        </Dropdown.Item>
      )
    })

    return (
      <Dropdown text='Customer'>
        <Dropdown.Menu>
          {customerItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default CustomerMenu;
