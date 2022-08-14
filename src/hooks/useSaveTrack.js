import { useContext } from 'react';
import { Context as LocationContext } from '../context/LocationContext';
import { Context as TrackContext } from '../context/TrackContext';
import { navigate } from '../navigationRef';

export default () => {
  const { createTrack, reset } = useContext(TrackContext);
  const {
    state: { locations, name },
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();
    navigate('TrackList');
  };

  return [saveTrack];
};
