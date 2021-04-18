import React, { useState } from 'react';
import { FormControl, OutlinedInput, InputAdornment, InputLabel, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const getInputType = (type, passwordIsVisible) => {
    if (type !== 'password') {
        return type;
    }
    return passwordIsVisible ? 'text' : 'password';
};

const ExtendedFormControl = (props) => {
    const [passwordIsVisible, setPasswordVisibility] = useState(false);

    const handlePasswordVisibility = () => setPasswordVisibility(!passwordIsVisible);

    const handlePasswordMouseDown = (event) => event.preventDefault();

    return (
        <FormControl variant="outlined" required={true} fullWidth={true}>
            <InputLabel htmlFor={props.label}>{props.label}</InputLabel>
            <OutlinedInput
                id={props.label}
                type={getInputType(props.type, passwordIsVisible)}
                label={props.label}
                endAdornment={
                    props.type === 'password' ? (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handlePasswordVisibility}
                                onMouseDown={handlePasswordMouseDown}
                                edge="end"
                            >
                                {passwordIsVisible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ) : null
                }
                labelWidth={70}
            />
        </FormControl>
    );
};

export default ExtendedFormControl;
