import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';

const EpisodeList = ({ show }) => {
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/episodes/?show=${show.id}`)
            .then(response => setEpisodes(response.data))
            .catch(error => console.log(error));
    }, [show]);

    const selectEpisode = (episode) => {
        setSelectedEpisode(episode);
    };

    return (
        <div>
            <h2>{show.title} - Episodes</h2>
            <ul>
                {episodes.map(episode => (
                    <li key={episode.id}>
                        <button onClick={() => selectEpisode(episode)}>
                            Episode {episode.episode_number}: {episode.title}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedEpisode && <CommentList episode={selectedEpisode} />}
        </div>
    );
};

export default EpisodeList;
