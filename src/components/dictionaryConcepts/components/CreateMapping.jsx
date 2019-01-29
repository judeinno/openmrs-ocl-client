import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async';
import PropTypes from 'prop-types';
import { fetchSourceConcepts } from '../../../redux/actions/concepts/dictionaryConcepts';
import { INTERNAL_MAPPING_DEFAULT_SOURCE } from './helperFunction';
import MapType from './MapType';

class CreateMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInputChange = (value) => {
    this.setState({ inputValue: value });
  };

  render() {
    const { inputValue } = this.state;
    const {
      map_type,
      source,
      to_concept_code,
      to_concept_name,
      index,
      updateEventListener,
      removeMappingRow,
      updateAsyncSelectValue,
    } = this.props;

    return (
      <table className="table table-striped table-bordered concept-form-table" id="table-mappings">
        <tbody>
          <tr>
            <td>
              <input
                tabIndex={index}
                className="form-control"
                placeholder="source"
                type="text"
                name="source"
                onChange={updateEventListener}
              />
            </td>
            <td>
              {
                <MapType
                  updateEventListener={updateEventListener}
                  index={index}
                  map_type={map_type}
                  source={source}
                />
              }
            </td>
            {source && source !== INTERNAL_MAPPING_DEFAULT_SOURCE && (
              <td>
                <input
                  tabIndex={index}
                  defaultValue={to_concept_code}
                  className="form-control"
                  placeholder="to_concept_code"
                  type="text"
                  name="to_concept_code"
                  id="to_concept_code"
                  onChange={updateEventListener}
                />
              </td>
            )}
            {source && (
              <td className="react-async">
                {source === INTERNAL_MAPPING_DEFAULT_SOURCE ? (
                  <AsyncSelect
                    cacheOptions
                    isClearable
                    loadOptions={async () => fetchSourceConcepts(source, inputValue, index)
                    }
                    onChange={updateAsyncSelectValue}
                    onInputChange={this.handleInputChange}
                    placeholder="concept name"
                  />
                ) : (
                  <input
                    tabIndex={index}
                    defaultValue={to_concept_name}
                    className="form-control"
                    placeholder="concept name (optional)"
                    type="text"
                    name="to_concept_name"
                    onChange={updateEventListener}
                  />
                )}
              </td>
            )}
            <td className="table-remove-link">
              <Link
                id="remove"
                tabIndex={index}
                onClick={removeMappingRow}
                to="#"
              >
                remove
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

CreateMapping.propTypes = {
  map_type: PropTypes.string,
  source: PropTypes.string,
  to_concept_code: PropTypes.string,
  to_concept_name: PropTypes.string,
  index: PropTypes.number,
  updateEventListener: PropTypes.func,
  removeMappingRow: PropTypes.func,
  updateAsyncSelectValue: PropTypes.func,
};

CreateMapping.defaultProps = {
  map_type: '',
  source: '',
  to_concept_code: '',
  to_concept_name: '',
  index: 0,
  updateEventListener: () => {},
  removeMappingRow: () => {},
  updateAsyncSelectValue: () => {},
};

export default CreateMapping;
