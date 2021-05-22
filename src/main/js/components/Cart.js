import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { createMuiTheme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";

import { useHistory } from "react-router-dom";

import ItemService from "../services/ItemService";
import CartItemService from "../services/CartItemService";

import { green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#002269",
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        FashionX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  chip: {
    color: "white",
    backgroundColor: "green",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0);
  const history = useHistory();

  useEffect(() => {
    CartItemService.getCartItems().then((res) => {
      console.log(res);
      setItems(res.data);
    });
  }, []);
  useEffect(() => {
    let sum = 0;
    items.forEach((item) => {
      sum += parseInt(item.cost * (1.0 - item.discount / 100.0));
    });
    setPrice(sum);
  }, [items]);

  const deleteCartItem = (id) => {
    CartItemService.deleteCartItem(id).then((res) => {
      setItems(items.filter((item) => item.id !== id));
    });
  };
  const goToHome = () => {
    history.push("/home");
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Welcome to FashionX
            </Typography>
            <Button
              style={{ marginRight: "10px" }}
              size="large"
              variant="contained"
              color="green"
              startIcon={<HomeIcon />}
              onClick={goToHome}
            >
              Home{" "}
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              onClick={() => {
                history.push("/logout");
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                My Cart
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Total: ₹ {price}
              </Typography>
              {/* <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div> */}
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {items.map((item) => (
                <Grid item key={item} xs={12} sm={6} md={4}>
                  <Card className={classes.card} raised={true}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={item.image_url}
                      title={item.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography>
                        {item.discount === 0 ? (
                          <span
                            style={{
                              fontSize: "24px",
                              width: "100%",
                              display: "block",
                            }}
                          >
                            ₹ {item.cost}{" "}
                            {item.latest === "Yes" && (
                              <span style={{ float: "right" }}>
                                <Chip color="secondary" label="NEW ARRIVAL" />
                              </span>
                            )}
                          </span>
                        ) : (
                          <span style={{ width: "100%", display: "block" }}>
                            <s>₹ {item.cost}</s>{" "}
                            <Chip
                              className={classes.chip}
                              label={`${item.discount}% OFF!`}
                            />
                            <span style={{ float: "right" }}>
                              {item.latest === "Yes" && (
                                <Chip color="secondary" label="NEW ARRIVAL" />
                              )}
                            </span>
                            <p style={{ fontSize: "24px" }}>
                              ₹{" "}
                              {parseInt(
                                item.cost * (1.0 - item.discount / 100.0)
                              )}
                            </p>
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        startIcon={<DeleteIcon />}
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => deleteCartItem(item.id)}
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <footer className={classes.footer}>
          <Copyright />
        </footer>
      </ThemeProvider>
    </React.Fragment>
  );
}
