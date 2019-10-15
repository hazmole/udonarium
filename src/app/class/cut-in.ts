import { SyncObject, SyncVar } from './core/synchronize-object/decorator';
import { ObjectNode } from './core/synchronize-object/object-node';
import { EventSystem } from './core/system';

@SyncObject('cut-in')
export class CutIn extends ObjectNode {
  @SyncVar() name: string = 'Cut In';
  @SyncVar() imageIdentifier: string = 'null';
  @SyncVar() triggerString: string = '';

  // GameObject Lifecycle
  onStoreAdded() {
    //super.onStoreAdded();
    //if (this.selected) EventSystem.trigger('SELECT_GAME_TABLE', { identifier: this.identifier });
  }
}
