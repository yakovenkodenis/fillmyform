export const formSetup1 = {
    name: "Форма 1",
    pages: [
      {
        name: "Сторінка 1",
        fields: [
          {
            type: "select",
            props: {
              label: "Організаційно-правова форма юридичної особи",
              name: "P1_O",
              initialOption: "Оберіть організаційно-правову форму",
              initialValue: "Оберіть організаційно-правову форму",
              options: [
                {
                  value: "designer",
                  label: "Designer"
                },
                {
                  value: "development",
                  label: "Developer"
                },
                {
                  value: "product",
                  label: "Product Manager"
                },
                {
                  value: "other",
                  label: "Other"
                }
              ],
              optionsUrl: 'https://jsonplaceholder.typicode.com/users'
            }
          },
          {
            type: "input",
            props: {
              label: "Назва юридичної особи",
              name: "P1_FN",
              type: "text",
              placeholder: "Назва юридичної особи..."
            }
          },
          {
            type: "input",
            props: {
              label: "Скорочене найменування юридичної особи (за наявності)",
              name: "P1_SN",
              type: "text",
              placeholder: "Скорочене найменування юридичної особи..."
            }
          },
          {
            type: "input",
            props: {
              label: "Найменування юридичної особи англійською мовою (за наявності)",
              name: "P1_NE",
              type: "text",
              placeholder: "Найменування юридичної особи англійською мовою..."
            }
          },
          {
            type: "input",
            props: {
              label: "Скорочене найменування юридичної особи англійською мовою (за наявності)",
              name: "P1_SE",
              type: "text",
              placeholder: "Скорочене найменування юридичної особи англійською мовою..."
            }
          },
          {
            type: "checkbox",
            props: {
              name: "P1_B",
              label: "Наявний кінцевий бенефіціарний власник (контролер) юридичної особи (так/ні)",
              // initialValue: true
            }
          },
          {
            type: "select",
            props: {
              label: "Вид громадського формування",
              name: "P1_SF",
              initialOption: "Оберіть вид громадського формування",
              visibilityCheckbox: "!P1_B",
              options: [
                {
                  value: "designer",
                  label: "Designer"
                },
                {
                  value: "development",
                  label: "Developer"
                },
                {
                  value: "product",
                  label: "Product Manager"
                },
                {
                  value: "other",
                  label: "Other"
                }
              ]
            }
          },
          {
            type: "input",
            props: {
              label: "Дані про статус",
              name: "P1_SI",
              type: "text",
              placeholder: "Дані про статус громадського формування...",
              visibilityCheckbox: "!P1_B"
            }
          },
          {
            type: "input",
            props: {
              label: "Мета діяльності",
              name: "P1_P0",
              type: "text",
              placeholder: "Мета діяльності громадського формування (згідно зі статутом)",
              visibilityCheckbox: "!P1_B"
            }
          },
          {
            type: "radio",
            props: {
              id: "radioGroup-registry-issue",
              label: "Чи потрібно видати виписку з ЄДРЮОФОПГФ в паперовій формі?",
              values: ["Так", "Ні"],
              name: "P1_I"
            }
          },
          {
            type: "radio",
            props: {
              id: "radioGroup-registry-issue-type",
              label: "Видати особисто заявнику чи надіслати поштовим відправленням?",
              values: ["Видати особисто заявнику", "Надіслати поштовим відправленням"],
              name: "P1_SP",
              visibilityRadio: { name: "P1_I", value: "Так"}
            }
          },
          {
            type: "radio",
            props: {
              id: "radioGroup-registry-issue-delivery-type",
              label: "На яку адресу надіслати виписку?",
              values: [
                "На адресу, що співпадає з місцезнаходженням",
                "На іншу поштову адресу"
              ],
              name: "P1_P",
              visibilityRadio: {
                name: "P1_SP", value: "Надіслати поштовим відправленням",
                dependancies: [{ name: "P1_I", value: "Так"}]
              }
            }
          },
          {
            type: "input",
            props: {
              label: "Поштова адреса:",
              name: "P1_PA",
              type: "text",
              placeholder: "Поштова адреса, на яку слід відправити виписку",
              visibilityRadio: {
                name: "P1_P", value: "На іншу поштову адресу",
                dependancies: [
                  { name: "P1_I", value: "Так"},
                  { name: "P1_SP", value: "Надіслати поштовим відправленням" }
                ]
              }
            }
          }
        ]
      },
      {
        name: "Сторінка 2",
        fields: [
          {
            type: "checkbox",
            props: {
              name: "P2_B",
              label: "Наявний кінцевий бенефіціарний власник (контролер) юридичної особи (так/ні)"
            }
          },
          {
            type: "input",
            props: {
              label: "Прізвище, ім'я, по батькові (за наявності)",
              name: "P2_FN",
              type: "text",
              placeholder: "Прізвище, ім'я, по батькові...",
              visibilityCheckbox: "P2_B"
            }
          },
          {
            type: "input",
            props: {
              label: "Дата народження",
              name: "P2_BD",
              type: "date",
              visibilityCheckbox: "P2_B"
            }
          },
          {
            type: "input",
            props: {
              label: "Реєстраційний номер облікової картки платника податків (за наявності)",
              name: "P2_RN",
              type: "text",
              visibilityCheckbox: "P2_B"
            }
          },
          {
            type: "group",
            name: "Паспортні дані",
            visibilityCheckbox: "P2_B",
            groupItems: [
              {
                type: "input",
                props: {
                  label: "Серія паспорту",
                  name: "P2_PS",
                  type: "text",
                  visibilityCheckbox: "P2_B"
                },
              },
              {
                type: "input",
                props: {
                  label: "Номер паспорту",
                  name: "P2_PN",
                  type: "text",
                  visibilityCheckbox: "P2_B"
                }
              }
            ]
          },
          {
            type: "select",
            props: {
              label: "Країна громадянства",
              name: "P2_N",
              visibilityCheckbox: "P2_B",
              initialOption: "Оберіть країну громадянства бенефіціарного власника",
              options: [
                {
                  value: "Україна",
                  label: "Україна"
                },
                {
                  value: "Шось ще",
                  label: "Шось ще"
                }
              ]
            }
          },
          {
            type: "group",
            name: "Місце проживання",
            visibilityCheckbox: "P2_B",
            groupItems: [
              {
                type: "input",
                props: {
                  label: "Поштовий індекс",
                  name: "P2_PI",
                  type: "text",
                  visibilityCheckbox: "P2_B"
                }
              },
              {
                type: "radio",
                props: {
                  id: "radioGroup-address-country",
                  label: "Країна проживання",
                  values: [
                    "Україна",
                    "Інша країна"
                  ],
                  name: "P2_UA",
                  visibilityCheckbox: "P2_B"
                }
              },
              {
                type: "radio",
                props: {
                  id: "radioGroup-address-region",
                  label: "Область чи АРК?",
                  values: [
                    "Область",
                    "Автономна Республіка Крим"
                  ],
                  name: "P2_RG",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "input",
                props: {
                  label: "Район області/Автономної Республіки Крим",
                  name: "P2_RGR",
                  type: "text",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "radio",
                props: {
                  id: "radioGroup-address-city",
                  label: "Тип населеного пункту",
                  values: [
                    "Місто",
                    "Селище міського типу",
                    "Селище",
                    "Село"
                  ],
                  name: "P2_CT",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "input",
                props: {
                  label: "Назва населеного пункту",
                  name: "P2_CTT",
                  type: "text",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "checkbox",
                props: {
                  name: "P2_CTR0",
                  label: "Район міста",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: [
                    { name: "P2_CT", value: "Місто" },
                    { name: "P2_UA", value: "Україна" }
                  ]
                }
              },
              {
                type: "input",
                props: {
                  label: "Назва району міста",
                  name: "P2_CTR",
                  type: "text",
                  visibilityCheckbox: ["P2_B", "P2_CTR0"],
                  visibilityValue: [
                    { name: "P2_CT", value: "Місто" },
                    { name: "P2_UA", value: "Україна" }
                  ]
                }
              },
              {
                type: "input",
                props: {
                  label: "Вулиця (інший тип елемента вулично-дорожної мережі) - зазначається разом з назвою",
                  name: "P2_S",
                  type: "text",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "input",
                props: {
                  label: "Будинок",
                  name: "P2_H",
                  type: "text",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "input",
                props: {
                  label: "Корпус",
                  name: "P2_C",
                  type: "text",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "input",
                props: {
                  label: "Тип приміщення",
                  name: "P2_T",
                  type: "text",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "input",
                props: {
                  label: "№ (квартири/кімнати/офісу тощо)",
                  name: "P2_TN",
                  type: "text",
                  visibilityCheckbox: "P2_B",
                  visibilityValue: {
                    name: "P2_UA", value: "Україна"
                  }
                }
              },
              {
                type: "input",
                props: {
                  label: "Назва країни:",
                  name: "P2_OC",
                  type: "text",
                  visibilityCheckbox: ["P2_B", "!P2_UA"],
                  visibilityValue: {
                    name: "P2_UA", value: "Інша країна"
                  }
                }
              }
            ]
          },
          {
            type: "input",
            props: {
              label: "Відсоток частки статутного капіталу в юридичній особі або відсоток права голосу в юридичній особі",
              name: "P2_CP",
              type: "text",
              visibilityCheckbox: "P2_B"
            }
          },
          {
            type: "radio",
            props: {
              id: "radioGroup-beneficiary-ownership-type",
              label: "Тип бенефіціарного володіння",
              values: [
                "Пряме",
                "Опосередковане",
                "Представництво",
                "Контроль здійснюється за допомогою іншого засобу"
              ],
              name: "P2_BO",
              visibilityCheckbox: "P2_B"
            }
          },
          {
            type: "textarea",
            props: {
              label: "Відомості про юридичних осіб, через яких здійснюється опосередкований вплив на юридичну особу",
              name: "P2_INF",
              type: "text",
              visibilityCheckbox: "P2_B",
              visibilityValue: {
                name: "P2_BO", value: "Опосередковане"
              }
            }
          }
        ]
      },
      {
        name: "Сторінка 3",
        fields: [
          {
            type: "checkbox",
            props: {
              name: "page3Checkbox",
              label: "Show some more"
            }
          },
          {
            type: "radio",
            props: {
              id: "radioGroup2",
              label: "One of these please",
              values: ["case 1", "case 2", "case 3", "case 4"],
              name: "supercase",
              visibilityCheckbox: "page3Checkbox"
            }
          },
          {
            type: "input",
            props: {
              label: "Another input",
              name: "anotherInput",
              type: "text",
              placeholder: "just write something...",
              visibilityCheckbox: "page3Checkbox"
            }
          }
        ]
      },
      {
        name: "Сторінка 4",
        fields: [
          {
            type: "input",
            props: {
              label: "Your mood",
              name: "mood",
              type: "text",
              placeholder: "Good"
            }
          }
        ]
      },
      {
        name: "Сторінка 5",
        fields: [
          {
            type: "input",
            props: {
              label: "Your mood",
              name: "mood",
              type: "text",
              placeholder: "Good"
            }
          }
        ]
      },
      {
        name: "Сторінка 6",
        fields: [
          {
            type: "input",
            props: {
              label: "Прізвище та ініціали особи, яка буде подавати заяву та ставити підпис",
              name: "AN",
              type: "text",
              placeholder: "Прізвище, ініціали підписанта"
            }
          }
        ]
      }
    ]
};

export const formSetup3 = {
  name: "Форма 3",
  pages: [
    {
      name: "page 1",
      fields: [
        {
          type: "input",
          props: {
            label: "First Name",
            name: "firstName",
            type: "text",
            placeholder: "Jane"
          }
        },
        {
          type: "input",
          props: {
            label: "Last Name",
            name: "lastName",
            type: "text",
            placeholder: "Doe"
          }
        },
        {
          type: "radio",
          props: {
            id: "radioGroup",
            label: "One of these please:",
            values: ["Case 1", "Case 2"],
            name: "variant"
          }
        }
      ]
    },
    {
      name: "page 2",
      fields: [
        {
          type: "input",
          props: {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "example@example.com"
          }
        }
      ]
    },
    {
      name: "page 3",
      fields: [
        {
          type: "checkbox",
          props: {
            name: "page3Checkbox",
            label: "Show some more"
          }
        },
        {
          type: "radio",
          props: {
            id: "radioGroup2",
            label: "One of these please",
            values: ["case 1", "case 2", "case 3", "case 4"],
            name: "supercase",
            visibilityCheckbox: "page3Checkbox"
          }
        },
        {
          type: "input",
          props: {
            label: "Another input",
            name: "anotherInput",
            type: "text",
            placeholder: "just write something...",
            visibilityCheckbox: "page3Checkbox"
          }
        }
      ]
    },
    {
      name: "page 4",
      fields: [
        {
          type: "input",
          props: {
            label: "Your mood",
            name: "mood",
            type: "text",
            placeholder: "Good"
          }
        }
      ]
    }
  ]
};

export const formSetup10 = {
  name: "Форма 10",
  pages: [
    {
      name: "page 1",
      fields: [
        {
          type: "input",
          props: {
            label: "First Name",
            name: "firstName",
            type: "text",
            placeholder: "Jane"
          }
        },
        {
          type: "input",
          props: {
            label: "Last Name",
            name: "lastName",
            type: "text",
            placeholder: "Doe"
          }
        },
        {
          type: "radio",
          props: {
            id: "radioGroup",
            label: "One of these please:",
            values: ["Case 1", "Case 2"],
            name: "variant"
          }
        }
      ]
    },
    {
      name: "page 2",
      fields: [
        {
          type: "input",
          props: {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "example@example.com"
          }
        },
        {
          type: "select",
          props: {
            label: "Job Type",
            name: "jobType",
            initialOption: "Select a job type",
            options: [
              {
                value: "designer",
                label: "Designer"
              },
              {
                value: "development",
                label: "Developer"
              },
              {
                value: "product",
                label: "Product Manager"
              },
              {
                value: "other",
                label: "Other"
              }
            ]
          }
        }
      ]
    },
    {
      name: "page 3",
      fields: [
        {
          type: "checkbox",
          props: {
            name: "page3Checkbox",
            label: "Show some more"
          }
        },
        {
          type: "radio",
          props: {
            id: "radioGroup2",
            label: "One of these please",
            values: ["case 1", "case 2", "case 3", "case 4"],
            name: "supercase",
            visibilityCheckbox: "page3Checkbox"
          }
        },
        {
          type: "input",
          props: {
            label: "Another input",
            name: "anotherInput",
            type: "text",
            placeholder: "just write something...",
            visibilityCheckbox: "page3Checkbox"
          }
        }
      ]
    },
    {
      name: "page 4",
      fields: [
        {
          type: "input",
          props: {
            label: "Your mood",
            name: "mood",
            type: "text",
            placeholder: "Good"
          }
        }
      ]
    },
    {
      name: "page 5",
      fields: [
        {
          type: "checkbox",
          props: {
            name: "page3Checkbox3",
            label: "Show some more"
          }
        },
        {
          type: "radio",
          props: {
            id: "radioGroup2",
            label: "One of these please",
            values: ["case 1", "case 2", "case 3", "case 4"],
            name: "supercase3",
            visibilityCheckbox: "page3Checkbox3"
          }
        },
        {
          type: "input",
          props: {
            label: "Another input",
            name: "anotherInput3",
            type: "text",
            placeholder: "just write something...",
            visibilityCheckbox: "page3Checkbox3"
          }
        }
      ]
    },
    {
      name: "page 6",
      fields: [
        {
          type: "input",
          props: {
            label: "Your mood",
            name: "mood3",
            type: "text",
            placeholder: "Good"
          }
        }
      ]
    }
  ]
};
