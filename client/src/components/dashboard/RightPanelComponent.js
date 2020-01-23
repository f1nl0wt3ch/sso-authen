import React from 'react'
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';

const buttonArr = ['Ohjeet', 'Tulosta', 'Kirjaudu ulos']
const styles = {
   Paper: {
     height: 150,
     boxShadow: 'none'
   },
   Typography: {
      width: '100%',
      fontWeight: 'bold',
      color: 'green',
      paddingRight: 50
   },
   GridItem: {
      margin: 'auto'
   },
   ToolBar: {
      verticalAlign: 'middle',
      margin: 10,
      padding: 15,
   },
   Button: {
      margin: 5,
      height: 50,
      maxWidth: 200,
      fontSize: 11
   }
}
export default props =>
<Grid item sm xs="12">
   <Paper style={ styles.Paper }>
       <Toolbar style={ styles.ToolBar }>
          <Typography variant="h5" style={styles.Typography}>Arek-työpöytä</Typography>
           {
             buttonArr.map( (btn,i) =>
                <Button key={i} color="secondary" variant="outlined" size="small" style={styles.Button}>{ btn }</Button>
             )
           }
       </Toolbar>
   </Paper>
</Grid>
