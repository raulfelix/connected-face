import React from 'react';
import styled from 'styled-components'
import Autosuggest from 'react-autosuggest';
import Colours from '../styled/Colours';
import { focus } from '../styled/Fonts';

const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${Colours.secondary};
  font-size: 24px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  width: 40px;
  ${focus};
`;

const EmptySuggestion = styled.div`
  color: ${Colours.primary};
`;

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => {
  if (suggestion.id === -100) {
    return (
      <EmptySuggestion>
        {suggestion.name}
      </EmptySuggestion>
    )
  }
  return (
    <div>
      {suggestion.name}
    </div>
  )
}

class SchoolAutosuggest extends React.Component {
  constructor(props) {
    super()
    this.state = {
      value: "",
      suggestions: []
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
    this.props.onChange(event)
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.props.fetcher(value).then(response => {
      if (this.props.lastOption && !response.find(f => f.id == -100)) {
        response.push(this.props.lastOption)
      }
      this.setState({
        suggestions: response
      })
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    if (suggestion) {
      if (this.props.clearOnSelect) this.setState({ value: ''})
      this.props.onSelect(suggestion);
    }
    event.preventDefault();
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      value,
      name: this.props.name,
      placeholder: this.props.placeholder,
      onChange: this.onChange,
      onBlur: this.props.onBlur
    }
    return (
      <div style={{position: 'relative'}}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        {
          value.length > 0 && (
            <ClearButton onClick={() => this.setState({value: ''})}>
              <i className="icon-clear"></i>
            </ClearButton>
          )
        }
      </div>
    )
  }
}

export default SchoolAutosuggest;