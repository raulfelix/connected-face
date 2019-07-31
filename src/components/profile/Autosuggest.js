import React from 'react';
import styled from 'styled-components'
import Autosuggest from 'react-autosuggest';

const AppendContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 4px;
`;

const ClearButton = styled.button`
  font-size: 24px;
`;

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)

class SchoolAutosuggest extends React.Component {
  constructor(props) {
    super()
    this.state = {
      value: props.value,
      suggestions: []
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.props.fetcher(value).then(response => {
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
      placeholder: this.props.placeholder,
      onChange: this.onChange
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