# HeatEquation-JS :fire:
Approximating heat equation in R^2

[Simulation](https://morcillosanz.github.io/HeatEquation-JS/)

## Formal definition
In mathematics, if given an open subset **U** of **R^n** (R^2 in this case) and a subinterval **I** of **R**, one says that a function **u : U × I → R** is a solution of the heat equation if

![alt text](https://github.com/MorcilloSanz/HeatEquation-JS/blob/main/img/definition.png)

where **(x, y, z, t)** denotes a general point of the domain. It is typical to refer to **t** as "time" and **x**, **y**, **z** as "spatial variables," even in abstract contexts where these phrases fail to have their intuitive meaning. For any given value of **t**, the right-hand side of the equation is the Laplacian of the function **u(⋅, t) : U → R**.

in which **α** is a positive coefficient called the thermal diffusivity of the medium

### Discretizing heat equation
Discretization of the 2D heat equation using **finite differences** (Taylor series aproximation)

![alt text](https://github.com/MorcilloSanz/HeatEquation-JS/blob/main/img/definition2.png)

## Examples
<table>
  <tr>
    <td><img src="./img/1.png" width = 250px height = 250px></td>
    <td><img src="./img/2.png" width = 250px height = 250px></td>
  </tr>
</table>
