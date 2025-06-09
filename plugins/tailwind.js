// TODO: Remove this file once all components are migrated to main.scss (TButton done so far)
import Vue from "vue";

import VueTailwind from "vue-tailwind";

import {
  TInput,
  TTextarea,
  TSelect,
  TRadio,
  // TCheckbox,
  TButton,
  // TInputGroup,
  // TCard,
  // TAlert,
  // TModal,
  // TDropdown,
  // TRichSelect,
  // TPagination,
  // TTag,
  TRadioGroup,
  // TCheckboxGroup,
  // TTable,
  // TDatepicker,
  // TToggle,
  // TDialog,
} from "vue-tailwind/dist/components";

// Class's applied to any interactive element
const interactiveFocus =
  " focus:outline-none focus:ring focus:border-blue-300 ";

// Generic class's for all form elements
const formClasses =
  "w-full rounded border-gray-400" +
  " focus:outline-none focus:ring focus:border-blue-300 " +
  interactiveFocus;

const settings = {
  "t-button": {
    component: TButton,
    props: {
      classes:
        "btn bg-red-500 hover:bg-red-700 text-white font-bold py-3" +
        " px-4 w-100 rounded w-full uppercase drop-shadow-md " +
        interactiveFocus,
    },
  },
  "t-input": {
    component: TInput,
    props: {
      classes: formClasses,
    },
  },
  "t-textarea": {
    component: TTextarea,
    props: {
      classes: formClasses,
    },
  },
  "t-select": {
    component: TSelect,
    props: {
      classes: formClasses,
    },
  },
  "t-radio": {
    component: TRadio,
    props: {
      classes: formClasses,
    },
  },
  "t-radio-group": {
    component: TRadioGroup,
    props: {
      classes: {
        groupWrapper: "flex flex-col",
        label: "",
        labelChecked: "",
        wrapper:
          "m-1 bg-gray-100 border border-gray-300 flex items-center px-4 py-2 rounded " +
          "shadow-sm cursor-pointer focus:shadow-outline text-gray-700 " +
          "hover:bg-gray-200 leading-5",
        wrapperChecked:
          "m-1 bg-gray-200 border border-gray-300 flex items-center px-4 py-2 " +
          "rounded shadow-inner cursor-pointer focus:shadow-outline text-gray-700 " +
          "hover:bg-gray-200 leading-5",
        inputWrapper: "",
        inputWrapperChecked: "",
        input: "absolute invisible",
      },
      variants: {
        columnLayout: {
          groupWrapper: "grid grid-cols-2",
        },
      },
    },
  },
};

Vue.use(VueTailwind, settings);
