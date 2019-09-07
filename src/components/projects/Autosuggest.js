import React from 'react';
import styled from 'styled-components'
import Autosuggest from 'react-autosuggest';
import Colours from '../styled/Colours';
import { focus } from '../styled/Fonts';

const AppendContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${Colours.secondary};
  font-size: 34px;
  height: 24px;
  line-height: 24px;
  margin: 0;
  padding: 0;
  width: 24px;
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
    console.log(props)
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
    console.log('onSuggestionsFetchRequested')
    this.props.fetcher(value).then(response => {
      console.log(response)
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
        <AppendContainer>
          <ClearButton onClick={() => this.setState({value: ''})}>&times;</ClearButton>
        </AppendContainer>
      </div>
    )
  }
}

export default SchoolAutosuggest;