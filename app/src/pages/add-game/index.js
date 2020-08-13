import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/layout';
import PageDiv from '../../components/page-div';
import Title from '../../components/title';
import FormCard from '../../components/form-card';
import Input from '../../components/input';
import EpicGamer from '../../components/epic-gamer';
import Textarea from '../../components/textarea';
import ImageInput from '../../components/image-input';
import SubmitButton from '../../components/submit-button';
import styles from './index.module.css';

const AddGame = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');

    const [description, setDescription] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');

    const [ posterInput, setPosterInput ] = useState('');
    const [ previewPoster, setPreviewPoster ] = useState('');
    const [ posterErr, setPosterErr ] = useState('');

    const [ trailerUrl, setTrailerUrl ] = useState('');
    const [ trailerUrlErr, setTrailerUrlErr ] = useState('');

    const canSubmit = () => {
        if (!name || !description || !trailerUrl || nameErr || descriptionErr || posterErr || trailerUrlErr) return false;

        return true;
    }

    const onChangeName = (e) => {
        const val = e.target.value;

        setName(val);

        if (val.length < 1) {
            setNameErr(`Game's name should be at least 1 character long`);
        } else {
            setNameErr('');
        }
    }

    const onChangeDescription = (e) => {
        const val = e.target.value;

        setDescription(val);

        if (val.length < 1) {
            setDescriptionErr(`Game's description should be at least 1 character long`);
        } else if (val.includes('"')) {
            setDescriptionErr(`Game's description should not contain quotes ("")`)
        }
        else {
            setDescriptionErr('');
        }
    }

    const onChangePoster = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setPosterInput('');
            setPreviewPoster('');
            setPosterErr('Poster must be provided');

            return;
        } else {
            setPosterErr('');
        }

        previewFile(file);
        setPosterInput(e.target.value);
    }

    const previewFile = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPreviewPoster(reader.result);
        };
    }

    const onChangeTrailerUrl = (e) => {
        const val = e.target.value;

        setTrailerUrl(val);

        if (val.startsWith('http://') || val.startsWith('https://')) {
            setTrailerUrlErr('');
        } else {
            setTrailerUrlErr(`Trailer Url should either start with 'http://' or 'https://'`)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!previewPoster) return;
        if (!canSubmit()) return;

        const promise = await fetch('http://localhost:9999/addGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                posterFile: previewPoster,
                trailerUrl
            })
        });

        const response = await promise.json();

        if (response.success) {
            history.push(`/g/${response._id}`);
        } else {
            const err = response.error;
            if (err.includes('image')) {
                posterErr(err);
            } else {
                setNameErr(err);
            }
        }
    }

    const handleBackBtn = () => {
        history.goBack();
    }

    return (
        <Layout>
            <PageDiv>
                <Title>Add a <EpicGamer>game</EpicGamer></Title>
                <FormCard onSubmit={handleSubmit}>
                    <Input label='Name' error={nameErr} onChange={onChangeName} />
                    <Textarea label='Description' error={descriptionErr} onChange={onChangeDescription} />
                    <ImageInput label='Poster' error={posterErr} onChange={onChangePoster} preview={previewPoster} />
                    <Input label='Trailer Url (embed version)' error={trailerUrlErr} name='trailerUrl' onChange={onChangeTrailerUrl} />
                    <SubmitButton value='Add' />
                    <Link className={styles.link} to='' onClick={handleBackBtn} >Back</Link>
                </FormCard>
            </PageDiv>
        </Layout>
    );
}

export default AddGame;
