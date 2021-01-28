import {Excel, Header, Toolbar, Formula, Table} from '@/components'
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';

import {normalizeInitialState} from '@/redux/initialState';
import {Page} from '@core/page/Page';
import {StateProcessor} from '@core/page/StateProcessor';
import {LocalStorageClient} from '@/shared/LocalStorageClient';

export class ExcelPage extends Page {
  constructor(params) {
    super(params)

    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }

  async getRoot() {
    const state = await this.processor.get()
    const initialState = normalizeInitialState(state)
    const store = createStore(rootReducer, initialState)

    this.storeSub = store.subscribe(this.processor.listen)

    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}
