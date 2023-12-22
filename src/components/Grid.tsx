import {GridProps} from '../assets/playersType';
import Notification from '../ui/Notification';
import GridColumnNames from './GridColumnNames';
import SinglePlayer from './SinglePlayer';

const Grid = (props: GridProps) =>  {
  return (
    <div>
        {props.isListEmpty  && <Notification message={props.message} />}
        {!props.isListEmpty && <>
                          <GridColumnNames />
                          {props.playersData.map(player => <SinglePlayer key={player.id} data={player} />)}
        </>}
    </div>
  )
}

export default Grid