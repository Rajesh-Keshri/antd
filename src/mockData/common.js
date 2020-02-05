export const  languageMock= {
  'success':true,
  'language': {
    'id': 'lng_47',
    'name': 'english',
    'code': 'ENG',
    'nativeName': 'english',
    'createdBy': '',
    'createdAt': '07/04/2019',
    'modifiedBy': '',
    'modifiedAt': '',
    'isActive':false
  }
}
  
export const  arrayLangMock=  {
  'totalLanguages': 10,
  'languages': [
    {
      'id': 'lng_1',
      'name': 'English',
      'code': 'EN',
      'nativeName': 'English',
      'createdBy': 'SYSTEM',
      'createdAt': '25/04/2019',
      'modifiedBy': 'TestNUser',
      'modifiedAt': '29/04/2019',
      'isActive': true,
      'isDefault': true
    },
    {
      'id': 'lng_2',
      'name': 'Arabic',
      'code': 'AR',
      'nativeName': 'عربى',
      'createdBy': 'SYSTEM',
      'createdAt': '25/04/2019',
      'modifiedBy': '',
      'modifiedAt': '',
      'isActive': true,
      'isDefault': false
    },
    {
      'id': 'lng_8',
      'name': 'Chinese',
      'code': 'ZH',
      'nativeName': '中文',
      'createdBy': 'SYSTEM',
      'createdAt': '25/04/2019',
      'modifiedBy': '',
      'modifiedAt': '',
      'isActive': true,
      'isDefault': false
    },
    {
      'id': 'lng_3',
      'name': 'French',
      'code': 'FR',
      'nativeName': 'français',
      'createdBy': 'SYSTEM',
      'createdAt': '25/04/2019',
      'modifiedBy': '',
      'modifiedAt': '26/04/2019',
      'isActive': true,
      'isDefault': false
    },
    {
      'id': 'lng_4',
      'name': 'German',
      'code': 'DE',
      'nativeName': 'Deutsche',
      'createdBy': 'SYSTEM',
      'createdAt': '25/04/2019',
      'modifiedBy': '',
      'modifiedAt': '',
      'isActive': true,
      'isDefault': false
    },
    {
      'id': 'lng_7',
      'name': 'Hindi',
      'code': 'HI',
      'nativeName': 'हिंदी',
      'createdBy': 'SYSTEM',
      'createdAt': '25/04/2019',
      'modifiedBy': '',
      'modifiedAt': '26/04/2019',
      'isActive': true,
      'isDefault': false
    }
  ]
}

export const testFormFactoryMock =[{
  disable: true,
  forceUpperCase: true,
  label: 'Class Code',
  name: 'cabinCode',
  type:'editView',
  rules: [{
    required: true,
    message: 'hello world'
  },
  {
    max: 2,
    message: ''
  },
  {
    pattern: /^[A-Za-z]*$/,
    message: ''
  }]
},
{
  type:'datePicker',
  format:'DD/MM/YYYY HH:mm',
  showTime:{format: 'HH:mm'},
  startDate:true,
  disable:true,
  name:'startDate',
  label:'startDate',
  rules:[{
    required: true,
    message:''
  }]
},
{
  type:'textArea',
  label: 'Class Code',
  name: 'classCode',
  rules: [{
    required: true,
    message: 'hello world'
  },
  {
    max: 2,
    message: ''
  },
  {
    pattern: /^[A-Za-z]*$/,
    message: ''
  }
  ]
},
{
  type:'radio-button',
  name:'Radio Buton',
  label:'Radio Buton',
  triggerChange: true,
  options:[{
    name:'Radio Buton1',
    value: 'Radio Buton1'
  },{
    name: 'Radio Buton2',
    value: 'Radio Buton2'
  }],
  rules:[{
    required: true,
    message: 'Radio Buton'
  }],
},
{
  type: 'checkbox',
  name:'checkboxInput',
  defaultChecked: false,
  info:{
    text:'Shift & insert',
    icon: 'error'
  },
  labelCheckbox:'Shift',
  rules:[]
}]

export const languageSetItemForm ={   
  item: {
    'id': 'lng_47',
    'name': 'english',
    'code': 'ENG',
    'nativeName': 'english',
    'createdBy': '',
    'createdAt': '07/04/2019',
    'modifiedBy': '',
    'modifiedAt': '',
    'isActive':false
  }
}
  
export const languageMockForm ={
  formObj:{
    LanguageCode:{
      name:'code',
      label:'Language Code',
      rules:[{
        required: true,
        message: 'Language is Required'
      },
      {
        max: 2,
        message: 'Keyword must not exceed 2 characters'
      },
      {
        pattern: new RegExp(/^([^0-9]*)$/),
        message: 'Wrong format!'   
      },
      {
        whitespace: true,
        message: 'Language is Required'
      }
      ]
    },
    Name:{
      name:'name',
      label:'Language Name in English',
      rules:[{
        required: true,
        message: 'Name is Required'
      },
           
      {
        max: 150,
        message: 'Keyword must not exceed 150 characters'
      },
      {
        whitespace: true,
        message: 'Name is Required'
      }]
  
    },
    nativeName:{
      name:'nativeName',
      label:'Language Name in Native Script',
      rules:[{
        required: true,
        message: 'Native Name is Required'
      },
            
      {
        max: 250,
        message: 'Keyword must not exceed 250 characters'
      },
      {
        whitespace: true,
        message: 'Native Name is Required'
      }]
    }
  },
  formArr1:[
    {
      StateCode:{
        forceUpperCase:true,
        name: 'state Code',
        label:'state code',
        disable:true,
        rules:[{
          required: true,
          message: 'required'
        }]
      },
      AlternateStateCode:{
        forceUpperCase:true,
        name:'AlternateStateCode',
        label:'',
        rules:[]
      },
      StateName:{
        name:'StateName',
        label:'',
        rules:[{
          required: true, 
          message: ''
        }]
      }
    }
  ],
  formArr2: [
    {
      StateCode:{
        forceUpperCase:true,
        name: 'state Code',
        label:'state code',
        disable:true,
        rules:[{
          required: true,
          message: 'required'
        }]
      },
      AlternateStateCode:{
        forceUpperCase:true,
        name:'AlternateStateCode',
        label:'',
        rules:[]
      },
      StateName:{
        name:'StateName',
        label:'',
        rules:[{
          required: true, 
          message: ''
        }]
      }
    },
    {
      TaxRegistrationNumber:{
        name:'TaxRegistrationNumber',
        label:'',
        rules:[
          {
            max: 50,
            message: ''
          }
        ]
      },
      StreetAddress1:{
        name:'StreetAddress1',
        label:'',
        rules:[
          {
            max: 500,
            message: ''
          }
        ]
      },
      StreetAddress2:{
        name:'StreetAddress2',
        label:'',
        rules:[
          {
            max: 500,
            message: ''
          }]
      },
      CityName:{
        name:'CityName',
        label:'',
        rules:[
          {
            max: 200,
            message: ''
          }
        ]
      }
    }
  ]
}