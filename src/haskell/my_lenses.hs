-- my_lenses.hs

{-# LANGUAGE TemplateHaskell #-}

import Control.Lens hiding (element)
import Control.Lens.TH

data Point  = Point { _x :: Double, _y :: Double } deriving (Show)
data Atom  = Atom { _element :: String, _point :: Point } deriving (Show)

shiftAtomX :: Atom -> Atom
shiftAtomX (Atom e (Point x y)) = Atom e (Point (x + 1) y)

$(makeLenses ''Atom)
$(makeLenses ''Point)

shiftAtomX2 :: Atom -> Atom
shiftAtomX2 = over (point . x) (+ 1)

data Molecule = Molecule { _atoms :: [Atom] } deriving (Show)

$(makeLenses ''Molecule)

shiftMoleculeX :: Molecule -> Molecule
shiftMoleculeX = over (atoms . traverse . point . x) (+ 1) 

myPointLens :: Functor f => (Point -> f Point) -> Atom -> f Atom
myPointLens famb atom = fmap (\newPoint -> atom { _point = newPoint }) (famb (_point atom))
