import React from 'react';

export default class ContactCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notiMsg: '',
      name: '',
      phone: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick  = this.handleClick.bind(this);
    this.handleKeyPress  = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) { 
    if ( e.charCode === 13 ) {
      this.handleClick();
    }
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleClick() {
    if (!this.state.name) {
      this.setState({
        notiMsg: '이름을 입력하여 주세요.'
      })
      return;
    }
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    };
    this.props.onCreate(contact);

    this.setState({
      notiMsg: '',
      name: '',
      phone: ''
    });

    this.nameInput.focus(); 
  }
  render() {

    return (
      <div>
        <h2>Create Contact</h2>
        <p style={{color: '#ff0000'}}>{this.state.notiMsg}</p>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            ref={ (ref) => { this.nameInput = ref} }
          />
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <button onClick={this.handleClick}>Create</button>
        </p>
      </div>
    );

  }
}

ContactCreate.propTypes = {
  onCreate: React.PropTypes.func
}

ContactCreate.defaultProps = {
  onCreate: () => { console.error('onCreate not defined'); }
}