import React from 'react'
import './app.css'
import { Typeahead } from 'react-bootstrap-typeahead';
import { isValid } from './Utlis';
import { Modal, Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [], // initialize to empty array
      value: '',
      error: null,
      options: props.options || [], // set options state to props.options
      showModal: false, // add showModal state
      modalMessage: '', // add modalMessage state
    };
  }

  setError = (error) => {
    this.setState({ error });
  };  
  
  handleChange = (selected) => {
    console.log(selected)
    const getEmail = (selected) => {
        const obj = selected.slice(-1)[0];
        return (obj.email)
      };
    const value = getEmail(selected)
    console.log(value)
    const isValidEmail = isValid(value, this.state.emails, (error) => {
      this.setState({ showModal: true, modalMessage: error });
    });
    if (isValidEmail) {
      this.setState({ emails: selected });
    }
  };
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleDelete = (toBeRemoved) => {
    this.setState({
      emails: this.state.emails.filter(email => email !== toBeRemoved)
    });
  };

  render() {
    return (
      <div>
        <Typeahead
          className="input"
          id="basic-typeahead-multi"
          labelKey="email"
          multiple
          allowNew
          onChange={this.handleChange}
          options={this.state.options}
          placeholder="+ email"
          selected={this.state.emails}
          renderToken={(option, { onRemove }, index) => (
            <div key={index} className="tag-item" onClick={() => onRemove(option)}>
              {option.email}
              <span className="button">&times;</span>
            </div>
          )}          
        />
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

export default App;
