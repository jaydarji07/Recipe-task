

// new page


import { push, ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import db from '../../../firebase';

const Write1 = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const [charCount, setCharCount] = useState(0);

    // Handle form submission
    const onSubmit = (data) => {
        const date = new Date(data.date);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        const formattedData = {
            ...data,
            date: `${day} ${month} ${year}`,
        };

        // Firebase write operation
        const newDocRef = push(ref(db, 'BlogName'));
        set(newDocRef, formattedData)
            .then(() => {
                alert('Data saved successfully!');
                reset();
                setImagePreview(null);  // Reset image preview
                setCharCount(0);  // Reset character count
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    };

    // Handle image link input change
    const handleImageChange = (e) => {
        setImagePreview(e.target.value);
    };

    // Handle character count for textarea
    const handleTextareaChange = (e) => {
        setCharCount(e.target.value.length);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="write-form">
                <h2 className="mb-4 mt-3 text-center Start-Journey">Share Your Journey</h2>
                <div className="form-container">
                    <div className="input-group">
                        {/* Title Input */}
                        <input
                            type="text"
                            className={`form-control shadow-lg title-input ${errors.title && 'is-invalid'}`}
                            {...register('title', { required: 'Title is required' })}
                            placeholder="Enter a captivating title"
                            autoFocus
                        />
                        {errors.title && <span className="error-text">{errors.title.message}</span>}
                    </div>

                    <div className="input-group">
                        {/* Image Link Input */}
                        <input
                            type="text"
                            className="form-control shadow-lg image-input"
                            {...register('image', { required: 'Image link is required' })}
                            placeholder="Paste your image URL"
                            onChange={handleImageChange}
                        />
                        {errors.image && <span className="error-text">{errors.image.message}</span>}
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" className="preview-img" />
                        </div>
                    )}

                    <div className="input-group">
                        {/* Date Input */}
                        <input
                            type="date"
                            className={`form-control shadow-lg ${errors.date && 'is-invalid'}`}
                            {...register('date', { required: 'Date is required' })}
                        />
                        {errors.date && <span className="error-text">{errors.date.message}</span>}
                    </div>

                    <div className="input-group">
                        {/* Image Description */}
                        <input
                            type="text"
                            className="form-control shadow-lg"
                            {...register('imageDescription')}
                            placeholder="Add a short image description"
                        />
                    </div>

                    <div className="input-group">
                        {/* Story Textarea */}
                        <textarea
                            className="form-control shadow-lg"
                            {...register('textarea', { required: 'Story content is required', maxLength: 1000 })}
                            rows="6"
                            placeholder="Start writing your story..."
                            onChange={handleTextareaChange}
                        ></textarea>
                        <small className="char-count">{charCount} / 1000 characters</small>
                        {errors.textarea && <span className="error-text">{errors.textarea.message}</span>}
                    </div>
                </div>
                <button className="btn btn-primary mt-4 shadow-lg submit-btn">Submit</button>
            </form>
        </>
    );
};

export default Write1;