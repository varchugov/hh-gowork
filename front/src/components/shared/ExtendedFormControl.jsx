import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Box from '@material-ui/core/Box';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
            {props.type === 'checkbox' ? (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.value}
                            onChange={(event) => props.onChange(event.target.checked, props.name)}
                            color={'primary'}
                            style={{}}
                        />
                    }
                    label={props.label}
                />
            ) : (
                <React.Fragment>
                    <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
                    <OutlinedInput
                        id={props.name}
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
                        error={props.errorMessage !== null}
                        value={props.value}
                        onChange={(event) => props.onChange(event.target.value, props.name)}
                    />
                </React.Fragment>
            )}
            {props.errorMessage && <Box color={'error.main'}>{props.errorMessage}</Box>}
        </FormControl>
    );
};

export default ExtendedFormControl;
