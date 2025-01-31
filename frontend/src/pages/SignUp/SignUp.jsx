import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Leaf } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [category, setCategory] = useState(null);

  const navigator = useNavigate();

  const auth = useSelector(state => state.auth.auth);
  if(auth){
    navigator("/dashboard")
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle signup logic here
    const data = {
      name: event.target.fullName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      ayushCategory: category
    }
    console.log(data)
    axios.post('http://localhost:3000/api/v1/user_signup', data)
    .then((response) => {
      console.log(response)
      toast.success("User created successfully!");
      navigator('/login')
    })
    .catch((error) => {
      toast.error("Something went wrong");
      console.error(error)
    })
    console.log('Signup form submitted')
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col justify-center items-center p-4">
      <Link to="/" className="flex items-center mb-8">
        <Leaf className="h-8 w-8 text-green-600 mr-2" />
        <span className="text-2xl font-bold text-green-800">AYUSH Portal</span>
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Sign up to access the AYUSH Startup Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ayushCategory">AYUSH Category</Label>
                <Select onValueChange={((value) => setCategory(value))}>
                  <SelectTrigger id="ayushCategory">
                    <SelectValue placeholder="Select AYUSH category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ayurveda">Ayurveda</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="unani">Unani</SelectItem>
                    <SelectItem value="siddha">Siddha</SelectItem>
                    <SelectItem value="siddha">Siddha</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
           { category == 'others' &&   <div className="space-y-2">
                <Label htmlFor="email">Other</Label>
                <Input id="other" type="email" placeholder="other category" required />
              </div>}
            </div>
            <Button type="submit" className="w-full mt-6">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}