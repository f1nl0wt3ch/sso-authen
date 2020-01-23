import React from 'react';
/*import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';*/
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default function ServiceRadioComponent({ service }) {
  return (
      <FormControlLabel
        value={service}
        control={<Radio color="primary" />}
        name="radio-button-demo"
        labelPlacement="bottom"
        label={service}
      />
  );
}
