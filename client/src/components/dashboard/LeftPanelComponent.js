import React from 'react'
import { Grid, Paper, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
   Item: {
      margin: 10
   },
   Paper: {
      height: 150,
      margin: 'auto',
      boxShadow: 'none',
      border: '0.2em solid green'
   },
   Typography: {
      textAlign: 'left',
      verticalAlign: 'middle',
      fontWeight: 'bold',
   },
   Menu: {
      color: 'green',
      paddingRight: 30,
      verticalAlign: 'middle',
      fontSize: 50,
      paddingLeft: 15
   }

}
export default props =>
<Grid sm xs="12" item style={ styles.Item }>
   <Paper style={ styles.Paper }>
    <Typography variant="h1" style={styles.Typography}>
       <MenuIcon style={styles.Menu} />
       arek
    </Typography>
   </Paper>
</Grid>
