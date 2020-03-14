import React, { useRef, useEffect } from 'react';
import autosize from 'autosize';
import styled from "@emotion/styled";
import { Field, useField } from "formik";
import AsyncCreatableSelect from 'react-select/async-creatable';


export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Field name={field.name} key={field.name}>
      {() => {
        return (
          <>
            <label htmlFor={props.name}>{label}</label>
            <input
              className="text-input"
              {...field}
              value={field.value ? field.value : ""}
              name={props.name}
              type={props.type}
              placeholder={props.placeholder}
              key={field.name}
            />
            {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
            ) : null}
          </>
        );
      }}
    </Field>
  );
};

// const StyledSelect = styled.select``;
const StyledLabel = styled.label``;


// loadTags = () => {
//   return new Promise(resolve => {
//       agent.Tags.getTagsList()
//       .then(tags => {
//           if (tags.success) {
//               resolve(tags.data.map(tag => ({
//                   label: tag.description, value: tag.tag_id.toString()
//               })));
//           } else resolve([]);
//       });
//   });
// }

// handleChange = (newValue, actionMeta) => {
//   console.group('Value changed');
//   console.log(newValue);
//   console.log(`action: ${actionMeta.action}`);
//   console.groupEnd();

//   const oldTags = this.state.tags;
//   const newTags = newValue;

//   switch (actionMeta.action) {
//       case 'remove-value':
//           this.removeTag(oldTags, newTags);
//           break;
//       case 'select-option':
//           this.selectTag(newValue[newValue.length - 1]);
//           break;
//       case 'create-option':
//           this.createTag(newValue);
//           break;
//       default:
//           break;
//   }

//   this.setState({
//       tags: newTags
//   });
// }

// removeTag = (oldTags, newTags) => {
//   // const diff = [...new Set(
//   //     [...new Set(oldTags)].filter(x => !new Set(newTags).has(x))
//   // )][0];

//   const diff = [...new Set(oldTags)].filter(x => !new Set(newTags).has(x))[0];

//   const tagId = diff.value;

//   agent.Tags.deleteTag(this.props.subscriberId, this.props.channelId, parseInt(tagId, 10))
//   .then(response => {
//       console.log('DELETE TAG FROM USER: ', response);
//   });
// }

// selectTag = (tag) => {
//   agent.Tags.addTag(this.props.subscriberId, this.props.channelId, tag.label)
//   .then(response => {
//       console.log('ADD TAG TO USER: ', response);
//   });
// }

// createTag = (value) => {
//   console.log('Creating new tag: ', value);

//   const {
//       channelId, subscriberId
//   } = this.props;

//   const newTag = value[value.length - 1].label;

//   agent.Tags.addTag(subscriberId, channelId, newTag)
//   .then(response => {
//       console.log('AFTER TAG ADDITION: ');
//       console.log(response);
//   })
// }


// const options = [
//   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//   { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
//   { value: 'purple', label: 'Purple', color: '#5243AA' },
//   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//   { value: 'orange', label: 'Orange', color: '#FF8B00' },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//   { value: 'green', label: 'Green', color: '#36B37E' },
//   { value: 'forest', label: 'Forest', color: '#00875A' },
//   { value: 'slate', label: 'Slate', color: '#253858' },
//   { value: 'silver', label: 'Silver', color: '#666666' },
// ];


export const MySelect = ({ initialOption, ...props }) => {
  const [field] = useField(props);

  const { options } = props;

  // console.log(props)
  // this should come from outer props.
  const isMulti = false;

  const filterColors = (inputValue) => {
    return options.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  
  // const loadOptions = (inputValue, callback) => {
  //   setTimeout(() => {
  //     callback(filterColors(inputValue));
  //   }, 1000);
  // };


  const loadOptions = (inputValue, callback) => {
    if (props.optionsUrl) {
      fetch(props.optionsUrl)
        .then(response => response.json())
        .then(json => callback(
          json
            .map(val => ({ label: val.name, value: val.username }))
            .filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
        )
      );
    } else {
      setTimeout(() => {
        callback(filterColors(inputValue));
      }, 1000);
    }
  }

  const onChange = (option) => {
    props.formik.setFieldValue(
      field.name,
      isMulti
        ? option.map(item => item.value)
        : option.value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <>
      {/* <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledSelect {...field} {...props}>
        <option value="">{initialOption}</option>
        {props.options.map(({ value, text }) => (
          <option value={value} key={value}>
            {text}
          </option>
        ))}
      </StyledSelect> */}
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <AsyncCreatableSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={field.onChange}
          onChange={onChange}
          onBlur={props.formik.onBlur}
          name={field.name}
          value={getValue()}
          isMulti={isMulti}
          placeholder={initialOption}
        />
    </>
  );
};

export const MyCheckbox = ({ children, ...props }) => {
  const [field] = useField(props);

  // console.log('MyCheckbox', props.displayOption);

  return (
    <Field name={field.name}>
      {() => {
        return (
          <label className="checkbox">
            {props.label}
            <input
              type="checkbox"
              // checked={field.value}
              {...field}
            />
          </label>
        );
      }}
    </Field>
  );
};

export const RadioButtonGroup = ({ values, formik, ...props }) => {
  const [field] = useField(props);
  const labels = values.map(value => {
    return (
      <label key={value}>
        <input
          type="radio"
          name={props.name}
          value={value}
          checked={field.value === value}
          onChange={() => formik.setFieldValue(props.name, value)}
        />
        {value}
      </label>
    );
  });

  return (
    <div className="radiobutton">
      <span className="mt-5">{props.label}</span>
      {labels}
    </div>
  );
};

export const TextArea = props => {
  const textAreaRef = useRef();
  const [field] = useField(props);

  useEffect(() => {
      autosize(textAreaRef.current);
  }, []);

  return (
      <div>
          <label htmlFor={props.name}>{props.label}</label>
          <textarea
              className="text-input"
              ref={textAreaRef}
              {...field}
          />
      </div>
  );
}
