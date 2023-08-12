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



var WordAttributeGuesser = class WordAttributeGuesser {
  constructor() {
    this.data = null
    this.missingField = null
    this.instruction = null
    this.labelsOfAttributes = {
      'spanish-translation': '西语翻译',
      'lexical-category': '词性',
      'simplified-chinese-characters': '汉字',
      'pinyin': '拼音'
    }
  }

  getLabelOfMissingAttribute() {
    return this.labelsOfAttributes[this.missingField]
  }

  getAttributeNode(label, content) {
    var attributeNode = document.createElement('div')
    var labelNode = document.createElement('div')
    labelNode.textContent = label + '：'
    labelNode.style.display = 'inline-block'
    var contentNode = document.createElement('div')
    contentNode.textContent = content
    contentNode.style.display = 'inline-block'
    attributeNode.appendChild(labelNode)
    attributeNode.appendChild(contentNode)
    return attributeNode
  }

  getInstruction() {
    var instruction = document.createElement('div')
    instruction.innerHTML = '<b>' + this.getLabelOfMissingAttribute() + '</b>是什么？'
    instruction.style.border = '1px solid black'
    instruction.style.display = 'inline-block'
    instruction.style.padding = '10px'
    return instruction
  }

  getFields() {
    var container = document.createElement('div')
    container.style.textAlign = 'left'
    container.style.display = 'inline-block'
    container.style.margin = 'auto'

    if(this.missingField != 'simplified-chinese-characters')
      container.appendChild(this.getAttributeNode('汉字', data['simplified-chinese-characters']))

    if(this.missingField != 'pinyin')
      container.appendChild(this.getAttributeNode('拼音', data['pinyin']))

    if(this.missingField != 'lexical-category') {
      var label = document.createElement('div')
      label.textContent = '词性：'
      var content = document.createElement('div')
      var lexicalCategoryInfo = lexicalCategories.find(x => x['acronym'] == data['lexical-category'])
      var n1 = document.createElement('div')
      n1.textContent = '缩写：' + lexicalCategoryInfo['acronym']
      var n2 = document.createElement('div')
      n2.textContent = '西语：' + lexicalCategoryInfo['es']
      var n3 = document.createElement('div')
      n3.textContent = '汉语：' + lexicalCategoryInfo['zh-hans']
      var n4 = document.createElement('div')
      n4.textContent = '拼音：' + lexicalCategoryInfo['pinyin']
      content.appendChild(n1)
      content.appendChild(n2)
      content.appendChild(n3)
      content.appendChild(n4)
      content.style.padding = '0 0 0 30px'
      container.appendChild(label)
      container.appendChild(content)
    }

    if(this.missingField != 'spanish-translation') {
      container.appendChild(this.getAttributeNode('西语翻译', data['spanish-translation']))
    }

    container.appendChild(this.getInstruction())
    return container
  }
}
