# Модули

## BZ
    <a name="module_BZ..BZ"></a>

### BZ~BZ
Класс, представляющий собой прослойку между моделью Document и приложениями, использующими API модели

**Kind**: inner class of <code>[BZ](#module_BZ)</code>  

* [~BZ](#module_BZ..BZ)
    * [.configure(config)](#module_BZ..BZ.configure) ⇒ <code>void</code>
    * [.getModel()](#module_BZ..BZ.getModel) ⇒ <code>Mongoose.Model</code>

<a name="module_BZ..BZ.configure"></a>

#### BZ.configure(config) ⇒ <code>void</code>
Настройка модуля

**Kind**: static method of <code>[BZ](#module_BZ..BZ)</code>  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>nconf</code> | конфигурация |

<a name="module_BZ..BZ.getModel"></a>

#### BZ.getModel() ⇒ <code>Mongoose.Model</code>
Получение модели документов

**Kind**: static method of <code>[BZ](#module_BZ..BZ)</code>  
<a name="module_BZ..Document"></a>

### BZ~Document
Класс, представляющий сущность document

**Kind**: inner class of <code>[BZ](#module_BZ)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | Название |
| author | <code>Mongoose.Types.ObjectId</code> | Автор |
| created | <code>Date</code> | Дата создания |
| social | <code>object</code> | Объект соц информации |
| social.downloads | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | кто скачал |
| social.watches | <code>Number</code> | количество просмотров |
| social.likes | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | кому понравилось |
| social.dislikes | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | кому не понравилось |
| social.comments | <code>[Array.&lt;Comment&gt;](#module_BZ..Comment)</code> | массив комментариев |
| socila.rating | <code>Number</code> | рейтинг |
| parts | <code>[Array.&lt;Part&gt;](#module_BZ..Part)</code> | массив частей |
| enabled | <code>boolean</code> | доступен ли для поиска |
| toDelete | <code>boolean</code> | нужно ли удалять документ |
| updated | <code>Date</code> | дата обновления |
| search | <code>object</code> | объект с данными для поиска |
| search.universities | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | массив id универов, которым подходит данная работа |
| search.faculties | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | массив id факультетов, которым подходит данная работа |
| search.year | <code>Array.&lt;number&gt;</code> | массив курсов, которым подходит данная работа |
| search.subject | <code>Mongoose.Types.ObjectId</code> | id предмета работы(Subject) |
| search.cType | <code>Mongoose.Types.ObjectId</code> | id типа работы(WorkType) |


* [~Document](#module_BZ..Document)
    * _instance_
        * [.addPart(newPart)](#module_BZ..Document+addPart) ⇒ <code>void</code>
        * [.isAllowToUpdate(userId)](#module_BZ..Document+isAllowToUpdate) ⇒ <code>boolean</code>
        * [.removePart(partId)](#module_BZ..Document+removePart) ⇒ <code>boolean</code>
        * [.saveDoc()](#module_BZ..Document+saveDoc) ⇒ <code>Document</code>
    * _static_
        * [.getDocumentsBy(title, context, page)](#module_BZ..Document.getDocumentsBy) ⇒ <code>Promise</code> &#124; <code>Promise.&lt;T&gt;</code>
        * [.addLike(documentId, userId)](#module_BZ..Document.addLike) ⇒ <code>Boolean</code>
        * [.addDislike(documentId, userId)](#module_BZ..Document.addDislike) ⇒ <code>Boolean</code>
        * [.addWatch(documentId)](#module_BZ..Document.addWatch) ⇒ <code>Boolean</code>
        * [.addDownload(documentId, userId)](#module_BZ..Document.addDownload) ⇒ <code>Boolean</code>
        * [.addComment(documentId, comment)](#module_BZ..Document.addComment) ⇒ <code>Boolean</code>
        * [.getComments(documentId, date)](#module_BZ..Document.getComments) ⇒ <code>Promise</code>

<a name="module_BZ..Document+addPart"></a>

#### document.addPart(newPart) ⇒ <code>void</code>
**Kind**: instance method of <code>[Document](#module_BZ..Document)</code>  
**Throws**:

- ValidationError, code = 204 - часть с таким урлом уже есть

**this**: <code>Document</code>  

| Param | Description |
| --- | --- |
| newPart | новая часть |

**Properties**

| Name | Description |
| --- | --- |
| url | строка, по которой можно скачать часть |

<a name="module_BZ..Document+isAllowToUpdate"></a>

#### document.isAllowToUpdate(userId) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Document](#module_BZ..Document)</code>  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>Mongoose.Types.ObjectId</code> | id пользователя, который хочет менять что-либо |

<a name="module_BZ..Document+removePart"></a>

#### document.removePart(partId) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>boolean</code> - ,true - все прошло хорошо  
**Throws**:

- ValidationError, code = 404 - часть с таким id не найдена
- ValidationError, code = 400 - не передана partId

**this**: <code>Document</code>  

| Param | Description |
| --- | --- |
| partId | id части для удаления |

<a name="module_BZ..Document+saveDoc"></a>

#### document.saveDoc() ⇒ <code>Document</code>
**Kind**: instance method of <code>[Document](#module_BZ..Document)</code>  
**Throws**:

- <code>DbError</code> , code = 500 - ошибка базы данных

**Functiontype**: generator  
<a name="module_BZ..Document.getDocumentsBy"></a>

#### Document.getDocumentsBy(title, context, page) ⇒ <code>Promise</code> &#124; <code>Promise.&lt;T&gt;</code>
Получение документов по названию и контексту

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | название |
| context | <code>Object</code> | контекст |
| context.university | <code>Mongoose.Types.ObjectId</code> | id университета |
| context.faculty | <code>Mongoose.Types.ObjectId</code> | id факультета |
| context.subject | <code>Mongoose.Types.ObjectId</code> | id предмета |
| context.type | <code>Mongoose.Types.ObjectId</code> | id типа |
| context.year | <code>Number</code> | курс(номер) |
| page |  | сколько страниц пропустить |

**Example**  
```js
<pre>
    Выход - массив из документов
    Структура документа:
    {
         title: 'Первый документ',
            author: 56dc4ecc380e1b4e768fe12e,
	        likes: 2,
		    dislikes: 0,
		    rating: 2,
		    type: 56dc4ecc380e1b4e768fe12e,
		    watches: 7,
		    id: 56fe9c4ca960bcce0e74871f
	    }
   </pre>
```
<a name="module_BZ..Document.addLike"></a>

#### Document.addLike(documentId, userId) ⇒ <code>Boolean</code>
Метод для добавления like к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: лайк добавлен, false: лайк не добавлен(скорее всего уже был);  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| userId | <code>Mongoose.Types.ObjectId</code> | id пользователя |

<a name="module_BZ..Document.addDislike"></a>

#### Document.addDislike(documentId, userId) ⇒ <code>Boolean</code>
Метод для добавления dislike к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: дизлайк добавлен, false: дизлайк не добавлен(скорее всего уже был);  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| userId | <code>Mongoose.Types.ObjectId</code> | id пользователя |

<a name="module_BZ..Document.addWatch"></a>

#### Document.addWatch(documentId) ⇒ <code>Boolean</code>
Метод для добавления просмотра к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: просмотр добавлен, false: просмотр не добавлен(скорее всего уже был);  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |

<a name="module_BZ..Document.addDownload"></a>

#### Document.addDownload(documentId, userId) ⇒ <code>Boolean</code>
Метод для добавления скачивания к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: скачивание добавлено, false: скачивание не добавлено(скорее всего уже было);  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| userId | <code>Mongoose.Types.ObjectId</code> | id пользователя |

<a name="module_BZ..Document.addComment"></a>

#### Document.addComment(documentId, comment) ⇒ <code>Boolean</code>
Метод для добавления комментария к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: комментарий добавлен, false: что-то непонятное произошло  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| comment | <code>Object</code> | объект комментария |
| comment.text | <code>String</code> | текст комментария |
| comment.author | <code>Mongoose.Types.ObjectId</code> | id автора |

<a name="module_BZ..Document.getComments"></a>

#### Document.getComments(documentId, date) ⇒ <code>Promise</code>
Метод для добавления комментария к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id
- <code>DbError</code> , code = 500 - какая-то ошибка БД

**Fulfill**: <code>Comment[]</code> result - массив комментариев  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| date | <code>Date</code> | время последнего комментария |

<a name="module_BZ..validateContext"></a>

### BZ~validateContext(rawContext) ⇒ <code>Object</code>
**Kind**: inner method of <code>[BZ](#module_BZ)</code>  

| Param |
| --- |
| rawContext | 

<a name="module_BZ..Comment"></a>

### BZ~Comment : <code>object</code>
**Kind**: inner typedef of <code>[BZ](#module_BZ)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| author | <code>Mongoose.Types.ObjectId</code> | отправитель |
| created | <code>Date</code> | дата создания |
| text | <code>String</code> | текст комментария |
| &quot;_id&quot; | <code>Mongoose.Types.ObjectId</code> | id комментария |

<a name="module_BZ..Part"></a>

### BZ~Part : <code>object</code>
**Kind**: inner typedef of <code>[BZ](#module_BZ)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | строка для скачивания |
| serialNumber | <code>Number</code> | порядковый номер файла |
| _id | <code>Mongoose.Types.ObjectId</code> | идентификатор части |


# Методы

## &nbsp;&nbsp;BZ
  <a name="module_BZ..BZ"></a>

### BZ~BZ
Класс, представляющий собой прослойку между моделью Document и приложениями, использующими API модели

**Kind**: inner class of <code>[BZ](#module_BZ)</code>  

* [~BZ](#module_BZ..BZ)
    * [.configure(config)](#module_BZ..BZ.configure) ⇒ <code>void</code>
    * [.getModel()](#module_BZ..BZ.getModel) ⇒ <code>Mongoose.Model</code>

<a name="module_BZ..BZ.configure"></a>

#### BZ.configure(config) ⇒ <code>void</code>
Настройка модуля

**Kind**: static method of <code>[BZ](#module_BZ..BZ)</code>  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>nconf</code> | конфигурация |

<a name="module_BZ..BZ.getModel"></a>

#### BZ.getModel() ⇒ <code>Mongoose.Model</code>
Получение модели документов

**Kind**: static method of <code>[BZ](#module_BZ..BZ)</code>  
<a name="module_BZ..Document"></a>

### BZ~Document
Класс, представляющий сущность document

**Kind**: inner class of <code>[BZ](#module_BZ)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | Название |
| author | <code>Mongoose.Types.ObjectId</code> | Автор |
| created | <code>Date</code> | Дата создания |
| social | <code>object</code> | Объект соц информации |
| social.downloads | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | кто скачал |
| social.watches | <code>Number</code> | количество просмотров |
| social.likes | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | кому понравилось |
| social.dislikes | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | кому не понравилось |
| social.comments | <code>[Array.&lt;Comment&gt;](#module_BZ..Comment)</code> | массив комментариев |
| socila.rating | <code>Number</code> | рейтинг |
| parts | <code>[Array.&lt;Part&gt;](#module_BZ..Part)</code> | массив частей |
| enabled | <code>boolean</code> | доступен ли для поиска |
| toDelete | <code>boolean</code> | нужно ли удалять документ |
| updated | <code>Date</code> | дата обновления |
| search | <code>object</code> | объект с данными для поиска |
| search.universities | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | массив id универов, которым подходит данная работа |
| search.faculties | <code>Array.&lt;Mongoose.Types.ObjectId&gt;</code> | массив id факультетов, которым подходит данная работа |
| search.year | <code>Array.&lt;number&gt;</code> | массив курсов, которым подходит данная работа |
| search.subject | <code>Mongoose.Types.ObjectId</code> | id предмета работы(Subject) |
| search.cType | <code>Mongoose.Types.ObjectId</code> | id типа работы(WorkType) |


* [~Document](#module_BZ..Document)
    * _instance_
        * [.addPart(newPart)](#module_BZ..Document+addPart) ⇒ <code>void</code>
        * [.isAllowToUpdate(userId)](#module_BZ..Document+isAllowToUpdate) ⇒ <code>boolean</code>
        * [.removePart(partId)](#module_BZ..Document+removePart) ⇒ <code>boolean</code>
        * [.saveDoc()](#module_BZ..Document+saveDoc) ⇒ <code>Document</code>
    * _static_
        * [.getDocumentsBy(title, context, page)](#module_BZ..Document.getDocumentsBy) ⇒ <code>Promise</code> &#124; <code>Promise.&lt;T&gt;</code>
        * [.addLike(documentId, userId)](#module_BZ..Document.addLike) ⇒ <code>Boolean</code>
        * [.addDislike(documentId, userId)](#module_BZ..Document.addDislike) ⇒ <code>Boolean</code>
        * [.addWatch(documentId)](#module_BZ..Document.addWatch) ⇒ <code>Boolean</code>
        * [.addDownload(documentId, userId)](#module_BZ..Document.addDownload) ⇒ <code>Boolean</code>
        * [.addComment(documentId, comment)](#module_BZ..Document.addComment) ⇒ <code>Boolean</code>
        * [.getComments(documentId, date)](#module_BZ..Document.getComments) ⇒ <code>Promise</code>

<a name="module_BZ..Document+addPart"></a>

#### document.addPart(newPart) ⇒ <code>void</code>
**Kind**: instance method of <code>[Document](#module_BZ..Document)</code>  
**Throws**:

- ValidationError, code = 204 - часть с таким урлом уже есть

**this**: <code>Document</code>  

| Param | Description |
| --- | --- |
| newPart | новая часть |

**Properties**

| Name | Description |
| --- | --- |
| url | строка, по которой можно скачать часть |

<a name="module_BZ..Document+isAllowToUpdate"></a>

#### document.isAllowToUpdate(userId) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Document](#module_BZ..Document)</code>  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>Mongoose.Types.ObjectId</code> | id пользователя, который хочет менять что-либо |

<a name="module_BZ..Document+removePart"></a>

#### document.removePart(partId) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>boolean</code> - ,true - все прошло хорошо  
**Throws**:

- ValidationError, code = 404 - часть с таким id не найдена
- ValidationError, code = 400 - не передана partId

**this**: <code>Document</code>  

| Param | Description |
| --- | --- |
| partId | id части для удаления |

<a name="module_BZ..Document+saveDoc"></a>

#### document.saveDoc() ⇒ <code>Document</code>
**Kind**: instance method of <code>[Document](#module_BZ..Document)</code>  
**Throws**:

- <code>DbError</code> , code = 500 - ошибка базы данных

**Functiontype**: generator  
<a name="module_BZ..Document.getDocumentsBy"></a>

#### Document.getDocumentsBy(title, context, page) ⇒ <code>Promise</code> &#124; <code>Promise.&lt;T&gt;</code>
Получение документов по названию и контексту

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | название |
| context | <code>Object</code> | контекст |
| context.university | <code>Mongoose.Types.ObjectId</code> | id университета |
| context.faculty | <code>Mongoose.Types.ObjectId</code> | id факультета |
| context.subject | <code>Mongoose.Types.ObjectId</code> | id предмета |
| context.type | <code>Mongoose.Types.ObjectId</code> | id типа |
| context.year | <code>Number</code> | курс(номер) |
| page |  | сколько страниц пропустить |

**Example**  
```js
<pre>
    Выход - массив из документов
    Структура документа:
    {
         title: 'Первый документ',
            author: 56dc4ecc380e1b4e768fe12e,
	        likes: 2,
		    dislikes: 0,
		    rating: 2,
		    type: 56dc4ecc380e1b4e768fe12e,
		    watches: 7,
		    id: 56fe9c4ca960bcce0e74871f
	    }
   </pre>
```
<a name="module_BZ..Document.addLike"></a>

#### Document.addLike(documentId, userId) ⇒ <code>Boolean</code>
Метод для добавления like к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: лайк добавлен, false: лайк не добавлен(скорее всего уже был);  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| userId | <code>Mongoose.Types.ObjectId</code> | id пользователя |

<a name="module_BZ..Document.addDislike"></a>

#### Document.addDislike(documentId, userId) ⇒ <code>Boolean</code>
Метод для добавления dislike к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: дизлайк добавлен, false: дизлайк не добавлен(скорее всего уже был);  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| userId | <code>Mongoose.Types.ObjectId</code> | id пользователя |

<a name="module_BZ..Document.addWatch"></a>

#### Document.addWatch(documentId) ⇒ <code>Boolean</code>
Метод для добавления просмотра к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: просмотр добавлен, false: просмотр не добавлен(скорее всего уже был);  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |

<a name="module_BZ..Document.addDownload"></a>

#### Document.addDownload(documentId, userId) ⇒ <code>Boolean</code>
Метод для добавления скачивания к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: скачивание добавлено, false: скачивание не добавлено(скорее всего уже было);  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| userId | <code>Mongoose.Types.ObjectId</code> | id пользователя |

<a name="module_BZ..Document.addComment"></a>

#### Document.addComment(documentId, comment) ⇒ <code>Boolean</code>
Метод для добавления комментария к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Returns**: <code>Boolean</code> - result - true: комментарий добавлен, false: что-то непонятное произошло  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id

**Functiontype**: generator  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| comment | <code>Object</code> | объект комментария |
| comment.text | <code>String</code> | текст комментария |
| comment.author | <code>Mongoose.Types.ObjectId</code> | id автора |

<a name="module_BZ..Document.getComments"></a>

#### Document.getComments(documentId, date) ⇒ <code>Promise</code>
Метод для добавления комментария к документу.

**Kind**: static method of <code>[Document](#module_BZ..Document)</code>  
**Throws**:

- <code>DbError</code> , code = 404 - Не найден документ по переданному id
- <code>DbError</code> , code = 500 - какая-то ошибка БД

**Fulfill**: <code>Comment[]</code> result - массив комментариев  

| Param | Type | Description |
| --- | --- | --- |
| documentId | <code>Mongoose.Types.ObjectId</code> | id документа |
| date | <code>Date</code> | время последнего комментария |

<a name="module_BZ..validateContext"></a>

### BZ~validateContext(rawContext) ⇒ <code>Object</code>
**Kind**: inner method of <code>[BZ](#module_BZ)</code>  

| Param |
| --- |
| rawContext | 

<a name="module_BZ..Comment"></a>

### BZ~Comment : <code>object</code>
**Kind**: inner typedef of <code>[BZ](#module_BZ)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| author | <code>Mongoose.Types.ObjectId</code> | отправитель |
| created | <code>Date</code> | дата создания |
| text | <code>String</code> | текст комментария |
| &quot;_id&quot; | <code>Mongoose.Types.ObjectId</code> | id комментария |

<a name="module_BZ..Part"></a>

### BZ~Part : <code>object</code>
**Kind**: inner typedef of <code>[BZ](#module_BZ)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | строка для скачивания |
| serialNumber | <code>Number</code> | порядковый номер файла |
| _id | <code>Mongoose.Types.ObjectId</code> | идентификатор части |

