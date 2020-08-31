import Link from 'next/link'
import Layout from '../components/Layout'

/* Material-UI Core */
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

/* Material-UI Icon */


import IndexStyle from '../styles/pages/index.module.scss'


const IndexPage = () => (
  <Layout>
    <div className="container">
      <div className={ IndexStyle.greetingText }>
        <Typography variant="h2" component="h1" gutterBottom>
          Hello 👋
        </Typography>
      </div>
      <form className={[IndexStyle.formIndex].join(' ')}>
        <TextField className={IndexStyle.formIndex} id="outlined-basic" label="Manga URL" variant="outlined" />

        <div className={[IndexStyle.formAction, 'layout-row layout-align-center-center'].join(' ')}>
          <Button>Get Images</Button>
        </div>
      </form>

      <div>
        
      </div>
      {/* <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p> */}
    </div>
    
  </Layout>
)

export default IndexPage
