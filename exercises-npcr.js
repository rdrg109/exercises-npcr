var lexicalCategories = [
  {'acronym': 'PrI', 'es': 'Pronombre Interrogativo', 'zh-hans': '疑问代词', 'pinyin': 'yíwèn dàicí'},
  {'acronym': 'PtI', 'es': 'Partículas Interrogativas', 'zh-hans': '疑问助词', 'pinyin': 'yíwèn zhùcí'},
  {'acronym': 'PT', 'es': 'Palabra de Tiempo', 'zh-hans': '时间词', 'pinyin': 'shíjiāncí'},
  {'acronym': 'V', 'es': 'Verbo', 'zh-hans': '动词', 'pinyin': 'dòngcí'},
  {'acronym': 'VC', 'es': 'Verbo más Complementos', 'zh-hans': '动补式动词', 'pinyin': 'dòngbǔshì dòngcí'},
  {'acronym': 'VO', 'es': 'Verbo más Objeto', 'zh-hans': '动宾式动词', 'pinyin': 'dòngbīnshì dòngcí'},
  {'acronym': 'SV', 'es': 'Sintagma Verbal', 'zh-hans': '动词词组', 'pinyin': 'dòngcí cízǔ'},
  {'acronym': 'PtV', 'es': 'Partículas Verbales', 'zh-hans': '动态助词', 'pinyin': 'dòngtài zhùcí'},
  {'acronym': 'O', 'es': 'Objeto', 'zh-hans': '宾语', 'pinyin': 'bīnyǔ'},
  {'acronym': 'Ono.', 'es': 'Onomatopeya', 'zh-hans': '象声词', 'pinyin': 'xiàngshēngcí'},
  {'acronym': 'EF', 'es': 'Expresión Fija', 'zh-hans': '习惯用语', 'pinyin': 'xíguàn yòngyǔ'},
  {'acronym': 'SN', 'es': 'Sintagma Nominal', 'zh-hans': '名词词组', 'pinyin': 'míngcí cízǔ'},
  {'acronym': 'Interj.', 'es': 'Interjección', 'zh-hans': '叹词', 'pinyin': 'tàncí'},
  {'acronym': 'V. Aux.', 'es': 'Verbo Auxiliar', 'zh-hans': '能愿动词', 'pinyin': 'néngyuàn dòngcí'},
  {'acronym': 'PtM', 'es': 'Partículas Modales', 'zh-hans': '语气助词', 'pinyin': 'yǔqì zhùcí'},
  {'acronym': 'Pr.', 'es': 'Pronombre', 'zh-hans': '代词', 'pinyin': 'dàicí'},
  {'acronym': 'S', 'es': 'Sujeto', 'zh-hans': '主语', 'pinyin': 'zhǔyǔ'},
  {'acronym': 'Adv.', 'es': 'Adverbio', 'zh-hans': '副词', 'pinyin': 'fùcí'},
  {'acronym': 'Prep.', 'es': 'Preposición', 'zh-hans': '介词', 'pinyin': 'jiècí'},
  {'acronym': 'A', 'es': 'Adjetivo', 'zh-hans': '形容词', 'pinyin': 'xíngróngcí'},
  {'acronym': 'Pref.', 'es': 'Prefijo', 'zh-hans': '词头', 'pinyin': 'cítóu'},
  {'acronym': 'NP', 'es': 'Nombre Propio', 'zh-hans': '专有名词', 'pinyin': 'zhuānyuǎn míngcí'},
  {'acronym': 'Conj.', 'es': 'Conjunción', 'zh-hans': '连词', 'pinyin': 'liáncí'},
  {'acronym': 'PtE', 'es': 'Partículas Estructurales', 'zh-hans': '结构助词', 'pinyin': 'jiégòu zhùcí'},
  {'acronym': 'Suf.', 'es': 'Sufijo', 'zh-hans': '词尾', 'pinyin': 'cíwēi'},
  {'acronym': 'N', 'es': 'Nombre', 'zh-hans': '名词', 'pinyin': 'míngcí'},
  {'acronym': 'Clas.', 'es': 'Clasificador', 'zh-hans': '量词', 'pinyin': 'liàngcí'},
  {'acronym': 'Pt.', 'es': 'Partícula', 'zh-hans': '助词', 'pinyin': 'zhùcí'},
  {'acronym': 'PL', 'es': 'Palabra de lugar', 'zh-hans': '地点词', 'pinyin': 'dìdiǎncí'},
  {'acronym': 'Nu.', 'es': 'Numeral', 'zh-hans': '数词', 'pinyin': 'shùcí'}
]

var guessWordAttribute = class guessWordAttribute extends exercise {
  constructor() {
    super()
    clearAllIntervals()
  }

  getMissingAttribute() {
    return this.attributes.filter((x) => x['field-name'] == this.missingAttribute)[0]
  }

  getLabelOfMissingAttribute() {
    return this.getMissingAttribute()['label']
  }

  getAttributeNode(label, content) {
    var attributeNode = document.createElement('div')
    var labelNode = document.createElement('div')
    labelNode.textContent = label + this.separatorOfLabelAndContent
    labelNode.style.display = 'inline-block'
    var contentNode = document.createElement('div')
    contentNode.textContent = content
    contentNode.style.display = 'inline-block'
    attributeNode.appendChild(labelNode)
    attributeNode.appendChild(contentNode)
    return attributeNode
  }

  check() {
    var attribute = this.attributes.filter((x) => x['field-name'] == this.missingAttribute)[0]
    var node = null
    if(attribute['func-back'])
      node = attribute['func-back'](this.data[attribute['field-name']])
    else if(attribute['func'])
      node = attribute['func'](this.data[attribute['field-name']])
    else {
      node = document.createElement('div')
      node.textContent = this.data[this.missingAttribute]
    }
    // We add a class to the main container of the answer so that we
    // can refer to the same context when naming classes in CSS
    var line = document.createElement('hr')
    this.nodeContainer.appendChild(line)
    this.nodeContainer.appendChild(node)
  }

  getNode() {
    var nodeContainer = document.createElement('div')
    this.nodeContainer = nodeContainer
    if(this.cssClassForContainer)
      nodeContainer.classList.add(this.cssClassForContainer)
    for(const attribute of this.attributes) {
      if(attribute['field-name'] == this.missingAttribute)
        continue
      var node = null
      if(attribute['func'])
        node = attribute['func'](this.data[attribute['field-name']])
      else
        node = this.getAttributeNode(attribute['label'], this.data[attribute['field-name']])
      nodeContainer.appendChild(node)
    }
    nodeContainer.appendChild(this.getInstruction())
    var attribute = this.getMissingAttribute()
    if(attribute['func-front']) {
      node = attribute['func-front'](this.data[attribute['field-name']])
      nodeContainer.appendChild(node)
    }
    this.startAudioLoop()
    return nodeContainer
  }

  startAudioLoop() {
    this.loopedAudio = new loopedAudio()
    this.loopedAudio.file = this.data[this.fieldNameAudio]
    this.loopedAudio.nodeContainer = this.nodeContainer
    this.loopedAudio.startLoop()
  }
}

var guessWordAttributeNPCR = class guessWordAttributeNPCR extends guessWordAttribute {
  getInstruction() {
    var node = document.createElement('div')
    node.classList.add('instruction')
    var span1 = document.createElement('span')
    span1.classList.add('missing-attribute-label')
    node.appendChild(span1)
    span1.textContent = this.getLabelOfMissingAttribute()
    var span2 = document.createElement('span')
    node.appendChild(span2)
    span2.textContent = '是什么？'
    return node
  }
  getNodeSimplifiedChineseCharactersFront(chineseCharacters) {
    var input = document.createElement('input')
    input.type = 'text'
    input.id = 'input'
    addEventListenersToInputTextWhenInputNode(input)
    return input
  }
  getNodeSimplifiedChineseCharactersBack(chineseCharacters) {
    checkUserInputAgainstAnswerCaseInsensitive('input', chineseCharacters)
    var nodeContainer = document.createElement('div')
    nodeContainer.classList.add('chinese-characters')
    nodeContainer.textContent = chineseCharacters
    return nodeContainer
  }
  getNodeLexicalCategory(lexicalCategory) {
    var nodeContainer = document.createElement('div')
    nodeContainer.classList.add('lexical-category')
    var label = document.createElement('div')
    label.classList.add('label')
    nodeContainer.appendChild(label)
    label.textContent = '词性：'
    var content = document.createElement('div')
    content.classList.add('content')
    nodeContainer.appendChild(content)

    var lexicalCategoryInfo = lexicalCategories.find(x => x['acronym'] == lexicalCategory)
    var n1 = document.createElement('div')
    n1.textContent = '汉语：' + lexicalCategoryInfo['zh-hans']
    var n2 = document.createElement('div')
    n2.textContent = '拼音：' + lexicalCategoryInfo['pinyin']
    var n3 = document.createElement('div')
    n3.textContent = '西语：' + lexicalCategoryInfo['es']
    var n4 = document.createElement('div')
    n4.textContent = '缩写：' + lexicalCategoryInfo['acronym']
    content.appendChild(n1)
    content.appendChild(n2)
    content.appendChild(n3)
    content.appendChild(n4)
    return nodeContainer
  }
  constructor() {
    super()
    this.fieldNameAudio = 'audio'
    this.cssClassForContainer = 'exercises-npcr-guess-word-attribute'
    this.separatorOfLabelAndContent = '：'
    this.attributes = [
      {
        'field-name': 'simplified-chinese-characters',
        'label': '汉字',
        'func-front': this.getNodeSimplifiedChineseCharactersFront,
        'func-back': this.getNodeSimplifiedChineseCharactersBack
      },
      {
        'field-name': 'pinyin',
        'label': '拼音'
      },
      {
        'field-name':
        'spanish-translation',
        'label': '西语翻译'
      },
      {
        'field-name': 'lexical-category',
        'label': '词性',
        'func': this.getNodeLexicalCategory
      }
    ]
  }
}
