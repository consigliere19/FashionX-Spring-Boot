import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
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
import { useHistory } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";

import ItemService from "../services/ItemService";
import CartItemService from "../services/CartItemService";

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

export default function Home() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [clothing, setClothing] = useState("All");
  const [type, setType] = useState("All");
  const history = useHistory();

  useEffect(() => {
    ItemService.getItems().then((res) => {
      console.log(res);
      setItems(res.data);
    });
  }, []);
  const handleChangeCategory = (event) => {
    const name = event.target.name;
    setCategory(event.target.value);
  };
  const handleChangeClothing = (event) => {
    const name = event.target.name;
    setClothing(event.target.value);
  };
  const handleChangeType = (event) => {
    const name = event.target.name;
    setType(event.target.value);
  };
  const onSearch = () => {
    ItemService.getItems().then((res) => {
      console.log(res);
      let r = res.data
        .filter((item) => {
          if (category === "All") return true;
          else return item.category === category;
        })
        .filter((item) => {
          if (clothing === "All") return true;
          else if (clothing === "Tshirts/Tops") return item.type === "Tshirt" || item.type === "Top";
          else if (clothing === "Jackets") return item.type === "Jacket";
          else if (clothing === "Shorts/Pants") return item.type === "Shorts" || item.type === "Pants";
        })
        .filter((item) => {
          if (type === "All") return true;
          else if (type === "Discounted items") return item.discount > 0;
          else if (type === "New arrivals") return item.latest === "Yes";
        });
      setItems(r);
    });
  };
  const onAddToCart = (cartItem) => {
    let { name, category, latest, image_url, cost, discount, type } = cartItem;
    console.log(cartItem);
    CartItemService.addCartItem({
      name,
      category,
      latest,
      image_url,
      cost,
      discount,
      type
    }).then((res) => console.log(res));
  };
  const goToCart = () => {
    history.push("/cart");
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
              startIcon={<ShoppingCartIcon />}
              onClick={goToCart}
            >
              Cart
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ExitToAppIcon />}
              onClick={()=>{history.push("/logout");window.location.reload();}}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                FashionX Online Apparel Store
              </Typography>
             
              <div>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">
                        Category
                      </InputLabel>
                      <Select
                        native
                        value={category}
                        onChange={handleChangeCategory}
                        inputProps={{
                          name: "age",
                          id: "age-native-simple",
                        }}
                      >
                        <option value={"All"}>All</option>
                        <option value={"Menswear"}>Menswear</option>
                        <option value={"Womenswear"}>Womenswear</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">
                        Clothing
                      </InputLabel>
                      <Select
                        native
                        value={clothing}
                        onChange={handleChangeClothing}
                        inputProps={{
                          name: "age",
                          id: "age-native-simple",
                        }}
                      >
                        <option value={"All"}>All</option>
                        <option value={"Tshirts/Tops"}>Tshirts/Tops</option>
                        <option value={"Jackets"}>Jackets</option>
                        <option value={"Shorts/Pants"}>Shorts/Pants</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                      <Select
                        native
                        value={type}
                        onChange={handleChangeType}
                        inputProps={{
                          name: "age",
                          id: "age-native-simple",
                        }}
                      >
                        <option value={"All"}>All</option>
                        <option value={"Discounted items"}>
                          Discounted items
                        </option>
                        <option value={"New arrivals"}>New arrivals</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={onSearch}
                      startIcon={<SearchIcon />}
                      style={{ marginTop: "10px" }}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {items.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card} raised={true}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.image_url}
                      title={card.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                        {card.discount === 0 ? (
                          <span
                            style={{
                              fontSize: "24px",
                              width: "100%",
                              display: "block",
                            }}
                          >
                            ₹ {card.cost}{" "}
                            {card.latest === "Yes" && (
                              <span style={{ float: "right" }}>
                                <Chip color="secondary" label="NEW ARRIVAL" />
                              </span>
                            )}
                          </span>
                        ) : (
                          <span style={{ width: "100%", display: "block" }}>
                            <s>₹ {card.cost}</s>{" "}
                            <Chip
                              className={classes.chip}
                              label={`${card.discount}% OFF!`}
                            />
                            <span style={{ float: "right" }}>
                              {card.latest === "Yes" && (
                                <Chip color="secondary" label="NEW ARRIVAL" />
                              )}
                            </span>
                            <p style={{ fontSize: "24px" }}>
                              ₹{" "}
                              {parseInt(
                                card.cost * (1.0 - card.discount / 100.0)
                              )}
                            </p>
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        startIcon={<ShoppingCartIcon />}
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => onAddToCart(card)}
                      >
                        Add to Cart
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
